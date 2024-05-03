import ToyForm from "./ToyForm";
import NavBar from "../../NavBar";

function ToyFormPage() {

    return (
        <>
        <div className="container text-center">
               <h1>Post a Toy</h1>
               <p>Have a toy you recommend? Share it with others!</p>
               <br/>
            </div>
        <ToyForm/>
        </>
    )
}

export default ToyFormPage