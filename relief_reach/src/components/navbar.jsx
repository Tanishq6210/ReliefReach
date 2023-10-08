 import React,{useState} from "react";
import { Link,useMatch,useResolvedPath } from "react-router-dom";
import '../navbar.css';

function Navbar() {
    const [active, setActive] = useState('nav__menu');
    const [toggleIcon,setToggleIcon] = useState("nav__toggler");
    const navToggle = () => {
        active === 'nav__menu' 
        ? setActive('nav__menu nav__active') 
        : setActive('nav__menu');

        toggleIcon === 'nav__toggler'
        ? setToggleIcon('nav__toggler toggle')
        : setToggleIcon('nav__toggler');
    };
    return(
        <nav className="nav">
            <Link to="#" className="brand">Donate 4 Change</Link>
            <ul className={active}>
                <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
                <li className="nav__item"><Link to="/NGOs" className="nav__link">NGOs</Link></li>
                <li className="nav__item"><Link to="/Dashboard" className="nav__link">Donation Logs</Link></li>
                <li className="nav__item"><Link to="/Admin" className="nav__link">Add NGOs</Link></li>
                <li className="nav__item"><Link to="/About" className="nav__link">Push Notifications</Link></li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}

function CustomLink({to,children,...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path :resolvedPath.pathname, end:true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
export default Navbar;