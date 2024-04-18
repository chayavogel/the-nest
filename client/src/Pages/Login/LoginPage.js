import SignupForm from "./SignUpForm"
import LoginForm from "./LoginForm"
import { useState } from "react"
import { clearError } from "../../Slices/UsersSlice"
import { useDispatch } from 'react-redux'

function LoginPage() {

    const [isClicked, setIsClicked] = useState(false)

    const dispatch = useDispatch()

    function handleClick() {
        setIsClicked(!isClicked);
        dispatch(clearError());
    }

    return (
        <div className="container text-center" style={{ maxWidth: "400px" }}>
            
        <header>
          <h1>The Nest</h1>
          <h2>Where moms flock</h2>
        </header>

        <br/>

        {isClicked ? <SignupForm /> : <LoginForm/>}

        <br/>
        
        <p>{isClicked ? "Already have an account?" : "Don't have an account yet?"}

        <br/>

        <button onClick={handleClick} type="button" className="btn btn-primary">
            {isClicked ? "Login" : "Sign up" }
        </button>

        </p>
        </div>
    )
}

export default LoginPage