import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "./Slices/UsersSlice";

function NavBar() {

    const dispatch = useDispatch();

    async function handleLogout() {
        const response = await dispatch(logoutUser());
        if (response.error && response.error.message === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON") {
            alert("Server Down!");
        } else if (response.error && response.error.message) {
            alert(response.error.message);
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">

            <div className="container-fluid">

                <NavLink className="navbar-brand" to="/">Home</NavLink>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/toys">Toys</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/toy_form">Post a Toy</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/account">Account</NavLink>
                    </li>
                </ul>

                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                
            </div>
        </nav>
    );
}

export default NavBar;
