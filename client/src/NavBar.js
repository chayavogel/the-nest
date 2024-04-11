// add logout button, make logout actually end the session

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "./Slices/UsersSlice"


function NavBar() {

    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logoutUser())
    }

    return (
        <nav>
            <button onClick={handleLogout}>
                Logout
            </button>
            <NavLink
                to="/"
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
                Post a Toy
            </NavLink>
        </nav>
    )
}

export default NavBar