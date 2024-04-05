// add logout button, make logout actually end the session

import { NavLink } from "react-router-dom";

function NavBar() {

    return (
        <nav>
            <NavLink
                to="/home"
                className="nav-link"
            >
                Home
            </NavLink>
            <NavLink
                to="/toys"
                className="nav-link"
            >
                Toys
            </NavLink>
            <NavLink
                to="/toy_form"
                className="nav-link"
            >
                Submit
            </NavLink>
        </nav>
    )
}

export default NavBar