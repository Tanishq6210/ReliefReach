import "./index.css"
export default function Navbar () {
    return <nav className="nav">
        <a href="/" className="site-title">ReliefReach</a>
        <ul>
            <CustomLink href="/donate">Donate</CustomLink>
            <CustomLink href="/dashboard">Transactions</CustomLink>
            <CustomLink href="/about">About</CustomLink>
        </ul>
    </nav>
}

function CustomLink({href, children, ...props}) {
    const path = window.location.pathname
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}