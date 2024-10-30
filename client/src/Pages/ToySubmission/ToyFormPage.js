import ToyForm from "./ToyForm";

function ToyFormPage() {

    return (
        <>
        <div className="container text-center">
               <h2 className="title">Post a Toy</h2>
               <p>Have a toy you recommend? Share it with others!</p>
               <br/>
            </div>
        <ToyForm/>
        </>
    )
}

export default ToyFormPage