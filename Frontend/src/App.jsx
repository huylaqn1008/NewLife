import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./components/Body/Body";
import ContactButtons from "./components/ButtonScreen/ContactBurron";
import ScrollToTopButton from "./components/ButtonScreen/ScrollToTopButton";
import CustomerComments from "./components/Customers/Customers";
import Partners from "./components/Customers/Partners";
import CreateEvent from "./components/Events/CreateEvent";
import Events from "./components/Events/Events";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Service from "./components/Services/Service";
import Tittle from "./components/Tittle/Tittle";
import ContactForm from "./components/Contact/Contact"; // Import ContactForm

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Route for the ContactForm */}
          <Route
            path="/contact"
            element={
              <>
                <ContactForm />
                <Footer />
              </>
            }
          />
          {/* Route for the main page containing all other components */}
          <Route
            path="/"
            element={
              <>
                <Body />
                <Tittle />
                <Events />
                <CreateEvent />
                <Service id="service" />
                <Partners id="partner" />
                <CustomerComments id="customer" />
                <Footer />
                <ContactButtons />
                <ScrollToTopButton />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
