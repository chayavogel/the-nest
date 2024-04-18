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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
            </div>
        </nav>
    );
}

export default NavBar;
