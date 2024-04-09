import { Outlet } from "react-router-dom"
import { useSelector } from 'react-redux'

import LoginPage from "./Login/LoginPage";
import HomePage from "./Home/HomePage";

function App() {

  const currentUser = useSelector((state) => state.users.currentUser)

  console.log("in app component", currentUser)

  return (
    <>
    <header>
      <h1>The Nest</h1>
      <p>Where moms flock</p>
    </header>
    { currentUser ? <HomePage /> : <LoginPage /> }
    {/* <Outlet /> */}
    </>
  );
}

export default App;