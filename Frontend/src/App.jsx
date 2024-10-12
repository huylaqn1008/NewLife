import Body from "./components/Body/Body";
import Customers from "./components/Customers/Customers";
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
      <div className="container">
        <Tittle />
        <Events />
        <CreateEvent />
      </div>
      <Service />
      <Customers />
    </div>
  );
};

export default App;
