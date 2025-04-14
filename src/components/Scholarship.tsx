// src/screens/Scholarship.tsx
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaGraduationCap, FaUserGraduate, FaFileDownload } from "react-icons/fa";
import axios from "axios";

interface College {
    _id: string;
    name: string;
    courses: string[];
}

interface ScholarshipFormValues {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    aadharNo: string;
    annualIncome: string;
    emailId: string;
    mobileNumber: string;
    incomeCertificate: File | null;
    tenthPercentage: string;
    twelfthPercentage: string;
    graduation: string;
    interestedCollege: string;
    interestedStream: string;
}

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    fatherName: Yup.string().required("Required"),
    motherName: Yup.string().required("Required"),
    aadharNo: Yup.string().length(12, "Must be 12 digits").required("Required"),
    annualIncome: Yup.string().required("Required"),
    emailId: Yup.string().email("Invalid email format").required("Required"),
    mobileNumber: Yup.string().length(10, "Must be 10 digits").required("Required"),
    tenthPercentage: Yup.string().required("Required"),
    twelfthPercentage: Yup.string().required("Required"),
});

export default function Scholarship() {
    const [collegeOptions, setCollegeOptions] = useState<{ value: string; label: string }[]>([]);
    const [streamOptions, setStreamOptions] = useState<{ value: string; label: string }[]>([]);
    const [colleges, setColleges] = useState<College[]>([]);
    const [selectedCollege, setSelectedCollege] = useState<string>("");

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/colleges/");
                const collegesData: College[] = res.data;
                setColleges(collegesData);

                // Format college options
                const formattedColleges = collegesData.map((college) => ({
                    value: college._id,
                    label: college.name
                }));

                setCollegeOptions([{ value: "", label: "Select College" }, ...formattedColleges]);
                // Initialize stream options as empty until a college is selected
                setStreamOptions([{ value: "", label: "Select Course" }]);

            } catch (error) {
                console.error("Error fetching dropdown data", error);
            }
        };

        fetchOptions();
    }, []);

    // Update streams when college selection changes
    const handleCollegeChange = (collegeId: string, setFieldValue: (field: string, value: any) => void) => {
        setSelectedCollege(collegeId);
        setFieldValue('interestedCollege', collegeId);
        setFieldValue('interestedStream', ''); // Reset stream selection

        if (!collegeId) {
            setStreamOptions([{ value: "", label: "Select Course" }]);
            return;
        }

        const selectedCollege = colleges.find(college => college._id === collegeId);
        if (selectedCollege) {
            const formattedStreams = selectedCollege.courses.map(course => ({
                value: course,
                label: course
            }));
            setStreamOptions([{ value: "", label: "Select Course" }, ...formattedStreams]);
        }
    };

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const initialValues: ScholarshipFormValues = {
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        aadharNo: "",
        annualIncome: "",
        emailId: "",
        mobileNumber: "",
        incomeCertificate: null,
        tenthPercentage: "",
        twelfthPercentage: "",
        graduation: "",
        interestedCollege: "",
        interestedStream: "",
    };

    const handleSubmit = (values: ScholarshipFormValues) => {
        console.log(values);
    };

    const inputClass =
        "mt-1 block w-full rounded-xl border border-gray-300 bg-white/60 shadow-md backdrop-blur-sm px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300";

    const errorClass = "text-sm text-red-500 mt-1";

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
                        Scholarship Application
                    </h1>
                    <p className="mt-3 text-lg text-gray-600">Fill out your details to apply</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto gap-2"
                    >
                        <FaFileDownload className="text-xl" />
                        Download Guidelines
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <FaUserGraduate className="text-3xl text-orange-500" />
                        <h2 className="text-2xl font-bold text-orange-600">Student Details</h2>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                {/* Personal Details Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <label htmlFor="firstName">First Name</label>
                                        <Field name="firstName" className={inputClass} />
                                        <ErrorMessage name="firstName" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field name="lastName" className={inputClass} />
                                        <ErrorMessage name="lastName" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="fatherName">Father's Name</label>
                                        <Field name="fatherName" className={inputClass} />
                                        <ErrorMessage name="fatherName" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="motherName">Mother's Name</label>
                                        <Field name="motherName" className={inputClass} />
                                        <ErrorMessage name="motherName" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="aadharNo">Aadhar No.</label>
                                        <Field name="aadharNo" className={inputClass} />
                                        <ErrorMessage name="aadharNo" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="annualIncome">Annual Income</label>
                                        <Field name="annualIncome" type="number" className={inputClass} />
                                        <ErrorMessage name="annualIncome" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="emailId">Email ID</label>
                                        <Field name="emailId" type="email" className={inputClass} />
                                        <ErrorMessage name="emailId" component="div" className={errorClass} />
                                    </div>

                                    <div>
                                        <label htmlFor="mobileNumber">Mobile Number</label>
                                        <Field name="mobileNumber" className={inputClass} />
                                        <ErrorMessage name="mobileNumber" component="div" className={errorClass} />
                                    </div>
                                </div>

                                {/* Educational Details Section */}
                                <div className="mt-12 mb-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FaGraduationCap className="text-3xl text-orange-500" />
                                        <h2 className="text-2xl font-bold text-orange-600">Educational Details</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="tenthPercentage">10th Percentage</label>
                                            <Field name="tenthPercentage" type="number" className={inputClass} />
                                            <ErrorMessage name="tenthPercentage" component="div" className={errorClass} />
                                        </div>

                                        <div>
                                            <label htmlFor="twelfthPercentage">12th Percentage</label>
                                            <Field name="twelfthPercentage" type="number" className={inputClass} />
                                            <ErrorMessage name="twelfthPercentage" component="div" className={errorClass} />
                                        </div>

                                        <div>
                                            <label htmlFor="graduation">Graduation % (Optional)</label>
                                            <Field name="graduation" type="number" className={inputClass} />
                                        </div>

                                        <div>
                                            <label htmlFor="interestedCollege">Interested College</label>
                                            <Field
                                                as="select"
                                                name="interestedCollege"
                                                className={inputClass}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                    handleCollegeChange(e.target.value, setFieldValue);
                                                }}
                                            >
                                                {collegeOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div>
                                            <label htmlFor="interestedStream">Interested Course</label>
                                            <Field
                                                as="select"
                                                name="interestedStream"
                                                className={inputClass}
                                                disabled={!selectedCollege}
                                            >
                                                {streamOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>
                                </div>

                                {/* File Upload Section */}
                                <div className="col-span-2 mb-8">
                                    <label htmlFor="incomeCertificate">Income Certificate</label>
                                    <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-500 transition duration-300">
                                        <FaCloudUploadAlt className="text-5xl text-orange-400" />
                                        <label htmlFor="file-upload" className="mt-2 cursor-pointer text-orange-600 hover:underline">
                                            <span>Upload or drag a file</span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files?.[0];
                                                    setFieldValue("incomeCertificate", file);
                                                    setSelectedFile(file?.name || null);
                                                }}
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500">PDF only. Max size 10MB</p>
                                        {selectedFile && <p className="mt-2 text-sm text-orange-600">{selectedFile}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 px-10 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Submit Application
                                    </motion.button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </motion.div>
            </div>
        </div>
    );
}
