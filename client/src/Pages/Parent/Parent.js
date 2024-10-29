import { Outlet } from "react-router-dom";
import NavBar from "../../NavBar";

function Parent({ handleClick }) {
  return (
    <>
      <div className="container mt-4">
        <header className="container text-center">
          <h1 onClick={handleClick}>The Nest</h1>
          <h2>Where Moms Flock</h2>
          <div>
            <NavBar />
          </div>
        </header>
        <br />
        <Outlet />
      </div>
    </>
  );
}

export default Parent;
