// add logout button, make logout actually end the session

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./Slices/UsersSlice"
import { useEffect } from "react";


function NavBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.users.currentUser)

    function handleLogout() {
        console.log("currentUser:", currentUser);
        dispatch(logoutUser())
        console.log("currentUser:", currentUser);
    }

    useEffect(() => {
        console.log("currentUser:", currentUser);
        if (currentUser === false) {
          navigate("/toys");
          console.log(currentUser)
        }
      }, [currentUser, navigate]);

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
            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    )
}

export default NavBar