import SignupForm from "./SignUpForm"
import LoginForm from "./LoginForm"
import { useState } from "react"

function LoginPage() {

    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
        setIsClicked(!isClicked)
    }

    return (
        <>
        {isClicked ? <SignupForm /> : <LoginForm/>}
        <button onClick={handleClick}>{isClicked ? "Already registered? Login" : "New? Sign up" }</button>
        </>
    )
}

export default LoginPage