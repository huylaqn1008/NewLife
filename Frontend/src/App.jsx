import Body from "./components/Body/Body";
import CustomerComments from "./components/Customers/Customers";
import Partners from "./components/Customers/Partners";
import CreateEvent from "./components/Events/CreateEvent";
import Events from "./components/Events/Events";
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
      <Service />
      <Partners />
      <CustomerComments />
    </div>
  );
};

export default App;
