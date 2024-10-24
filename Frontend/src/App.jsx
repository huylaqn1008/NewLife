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

const App = () => {
  return (
    <div>
      <Navbar />
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
    </div>
  );
};

export default App;
