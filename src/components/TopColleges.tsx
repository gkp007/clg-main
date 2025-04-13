import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Contact {
    email: string;
    phone: string;
    address: string;
}

interface College {
    _id: string;
    name: string;
    location: string;
    description: string;
    establishedYear: number;
    courses: string[];
    facilities: string[];
    contact: Contact;
    images: string[];
    rating: number;
    website: string;
}

export default function CollegeRankingTable() {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState('All');
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({ key: 'rating', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching colleges from API...');

            const API_URL = 'http://localhost:5000/api/colleges';
            console.log('Fetching from:', API_URL);

            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Server error response:', errorData);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received colleges data:', data);

            if (!Array.isArray(data)) {
                console.error('Received non-array data:', data);
                throw new Error('Invalid data format received from server');
            }

            console.log(`Received ${data.length} colleges`);
            setColleges(data);
        } catch (err) {
            console.error('Error fetching colleges:', err);
            setError(err instanceof Error ? err.message : 'An error occurred while fetching colleges');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const mainCourses = ["All", "B.TECH", "DIPLOMA", "MBA", "MCA"];
    const courses = mainCourses.filter(course =>
        course === "All" || colleges.some(college => college.courses.includes(course))
    );

    const filteredColleges = selectedCourse === 'All'
        ? colleges
        : colleges.filter((college) => college.courses.includes(selectedCourse));

    const sortedColleges = [...filteredColleges].sort((a, b) => {
        if (sortConfig.key === 'rating') {
            return sortConfig.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
    });

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentColleges = sortedColleges.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedColleges.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                    <p>Loading colleges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 max-w-full mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Error Loading Colleges</h3>
                    <p>{error}</p>
                    <button
                        onClick={fetchColleges}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (colleges.length === 0) {
        return (
            <div className="p-4 max-w-full mx-auto">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">No Colleges Found</h3>
                    <p>There are no colleges in the database yet.</p>
                    <button
                        onClick={fetchColleges}
                        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-full mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-center">Top Colleges</h2>

            {/* Course Filters */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center">Filter by Course</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                    {courses.map((course) => (
                        <button
                            key={course}
                            onClick={() => {
                                setSelectedCourse(course);
                                setCurrentPage(1); // Reset to first page when filter changes
                            }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${selectedCourse === course
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                                }`}
                        >
                            {course}
                            {course !== 'All' && (
                                <span className="ml-2 text-sm opacity-75">
                                    ({colleges.filter(college => college.courses.includes(course)).length})
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Debug Info - Remove in production */}
            <div className="mb-4 p-4 bg-gray-100 rounded">
                <p>Total Colleges: {colleges.length}</p>
                <p>Selected Course: {selectedCourse}</p>
                <p>Filtered Colleges: {filteredColleges.length}</p>
            </div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-4 max-w-full mx-auto overflow-x-auto sm:overflow-x-hidden"
            >
                <table className="w-full min-w-[700px] text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">College Name</th>
                            <th className="p-3">Location</th>
                            <th
                                className="p-3 cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleSort('rating')}
                            >
                                Rating {sortConfig.key === 'rating' && (sortConfig.direction === 'asc' ? '⬆️' : '⬇️')}
                            </th>
                            <th className="p-3">Courses</th>
                            <th className="p-3">Facilities</th>
                            <th className="p-3">Contact</th>
                            <th className="p-3">Established Year</th>
                            <th className="p-3">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentColleges.map((college, index) => (
                            <motion.tr
                                key={college._id}
                                className="border-b hover:bg-gray-50"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <td className="p-3">
                                    <div className="font-medium">{college.name}</div>
                                    <div className="text-sm text-gray-500">{college.description}</div>
                                </td>
                                <td className="p-3">{college.location}</td>
                                <td className="p-3">⭐ {college.rating}/5</td>
                                <td className="p-3">{college.courses?.join(', ') || 'N/A'}</td>
                                <td className="p-3">{college.facilities?.join(', ') || 'N/A'}</td>
                                <td className="p-3">
                                    {college.contact ? (
                                        <>
                                            <div>{college.contact.email}</div>
                                            <div>{college.contact.phone}</div>
                                            <div className="text-xs">{college.contact.address}</div>
                                        </>
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="p-3">{college.establishedYear}</td>
                                <td className="p-3">
                                    {college.website && (
                                        <a
                                            href={college.website.startsWith('http') ? college.website : `http://${college.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(indexOfLastItem, sortedColleges.length)}</span>{' '}
                                of <span className="font-medium">{sortedColleges.length}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
                                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}