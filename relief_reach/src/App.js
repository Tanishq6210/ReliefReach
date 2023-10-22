import './index.css';
import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Donate from "./pages/Donate"
import Admin from "./pages/Admin"
import {Route, Routes} from "react-router-dom"
import { ReactNode } from "react";
import { StytchProvider } from '@stytch/react';
import { StytchHeadlessClient } from '@stytch/vanilla-js/headless';


function App() {
  return (
    <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/donate" element = {<Donate/>} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/about" element = {<About/>} />
            <Route path="/admin" element = {<Admin/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
