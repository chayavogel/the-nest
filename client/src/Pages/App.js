import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchCurrentUser } from "../Slices/UsersSlice"
import { useEffect, useState } from "react";

import LoginPage from "./Login/LoginPage";
import Parent from "./Parent/Parent"


function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.users.currentUser)

  useEffect(() => {
      dispatch(fetchCurrentUser())
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false);
      });
  }, [dispatch]);

  function handleClick() {
    navigate("/")
  }

  if (loading) {
    return null
  }

  return (
    <div className="container mt-4 mb-4">
    { currentUser? <Parent handleClick={handleClick} /> : <LoginPage /> }
    </div>
  );
}

export default App;
