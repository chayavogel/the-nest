import { Outlet } from "react-router-dom";
import NavBar from "../../NavBar";

function ParentPage({ handleClick }) {
  return (
    <>
      <div className="container mt-4">
        <header className="container text-center">
          <h1 onClick={handleClick}>The Nest</h1>
          <h2>Where moms flock</h2>
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

export default ParentPage;
