import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <header>
      <h1>The Nest</h1>
    </header>
    <Outlet />
    </>
  );
}

export default App;

