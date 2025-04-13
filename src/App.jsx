import styles from "./style";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, ScholarshipSection, AboutStats, CategorySection, StudentPath, TopColleges } from "./components";

 
const App = () => (
  
  <div className="bg-white w-full overflow-hidden">
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 px-4 py-2 mx-12 bg-blue-50 text-sm">
      <div className="flex items-center gap-2 text-blue-700 font-medium">
        <FaPhoneAlt className="text-blue-600" />
        <span>7752058263</span>
      </div>
      <div className="flex items-center gap-2 text-blue-700 font-medium">
        <FaEnvelope className="text-blue-600" />
        <span>gkpattanaik001@gmail.com</span>
      </div>
    </div>
        <Navbar />
    <div className={`bg-white ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    
    <div className={`bg-white ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <AboutStats />
        <ScholarshipSection/>
        <Business />
        {/* <Billing /> */}
        <CategorySection />
        <StudentPath />;
      <TopColleges/>
        {/* <CardDeal /> */}
        <Testimonials />
        {/* <Clients /> */}
        <CTA />
        <Footer />
      </div>
    </div>
  </div>
);

export default App;
