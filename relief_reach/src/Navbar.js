import "./index.css"
import { Link } from "react-router-dom"
import { useMatch,  useResolvedPath} from "react-router-dom"

export default function Navbar () {
    return <nav className="nav">
        <Link to="/" className="site-title">ReliefReach</Link>
        <ul>
            <CustomLink to="/donate">Donate</CustomLink>
            <CustomLink to="/dashboard">Transactions</CustomLink>
            {/* <CustomLink to="/about">About</CustomLink> */}
            <CustomLink to="/admin">Admin</CustomLink>
        </ul>
    </nav>
}

function CustomLink({ to , children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname , end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}