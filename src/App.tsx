import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Counselling from './components/Counselling';
import Login from './components/Login';
import About from './components/About';
import InterestForm from './components/InterestForm';
import ContactUsForm from './components/ContactUsForm';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
                <Navbar />
                <main className="pt-16">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/counselling" element={<Counselling />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/interest" element={<InterestForm />} />
                        <Route path="/contact" element={<ContactUsForm />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App; 