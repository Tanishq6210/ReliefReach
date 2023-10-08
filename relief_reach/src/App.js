import './index.css';
import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Donate from "./pages/Donate"

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/dashboard":
      component = <Dashboard />
      break;
    case "/about":
      component = <About />
      break
    case "/donate":
      component = <Donate />
    break
  }
  return (
    <>
        <Navbar />
        <div className="container">
          {component}
        </div>
    </>
  );
}

export default App;
