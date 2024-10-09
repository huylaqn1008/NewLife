import Body from "./components/Body/Body"
import CreateEvent from "./components/Events/CreateEvent"
import Events from "./components/Events/Events"
import Navbar from "./components/Navbar/Navbar"
import Tittle from "./components/Tittle/Tittle"

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
    </div>
  )
}

export default App
