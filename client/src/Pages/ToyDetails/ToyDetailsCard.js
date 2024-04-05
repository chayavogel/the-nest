// When you click on details it takes you to details page for that toy
// user profile photo link will be replaced with a route to the user details page of that user
// add comments

// import { useNavigate } from "react-router-dom";

function ToyDetailsCard( { toy } ) {

    return (
        <>
        <p>{toy.name}</p>
        <a href={toy.image_url} className="image-button"><img src={toy.image_url} alt={toy.name} /></a>
        <a href={toy.link}>Purchase</a>
        <p>{toy.brand}</p>
        <p>{toy.description}</p>
        <a href={toy.user.profile_picture}><img src={toy.user.profile_picture} alt={toy.user.firstname + " " + toy.user.lastname} /></a>
        <p>{toy.user.firstname + toy.user.lastname}</p>
        {/* comments */}
        </>
    );

}

export default ToyDetailsCard