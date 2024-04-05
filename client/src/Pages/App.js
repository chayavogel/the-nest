import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <header>
      <p>בּס״ד</p>
      <h1>The Nest</h1>
      <p>Where moms flock to nurture and thrive together</p>
    </header>
    <Outlet />
    </>
  );
}

export default App;

