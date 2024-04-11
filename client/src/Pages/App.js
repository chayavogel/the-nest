import { Outlet , useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUser } from "../Slices/UsersSlice"
import { useEffect } from "react";

import LoginPage from "./Login/LoginPage";


function App() {

  const currentUser = useSelector((state) => state.users.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
      dispatch(fetchCurrentUser());
  }, [dispatch]);

  function handleClick() {
    navigate("/")
  }

  return (
    <>
    <header>
      <h1 onClick={handleClick} >The Nest</h1>
      <p>Where moms flock</p>
    </header>
    { currentUser ? <Outlet /> : <LoginPage /> }
    </>
  );
}

export default App;

