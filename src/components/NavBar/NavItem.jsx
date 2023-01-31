import { Link } from "react-router-dom";

const NavItem = ({text, href, children}) =>{

    return (
        <Link to={href}>{children}</Link>
    );
}

export default NavItem;