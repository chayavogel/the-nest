// user profile photo link will be replaced with a route to the user details page of that user
// button details will be replaced with a route to the toy details page of that toy

import {Link} from "react-router-dom";

function ToyCard({ toy }) {
    
    return (
        <>
        <p>{toy.name}</p>
        <a href={toy.image_url} className="image-button"><img src={toy.image_url} alt={toy.name} /></a>
        <a href={toy.link}>Purchase</a>
        <Link to={`/user_details/${toy.user.id}`}><img src={toy.user.profile_picture} alt={toy.user.firstname + " " + toy.user.lastname} /></Link>
        <Link to={`/toy_details/${toy.id}`}>Details</Link>
        </>
    );
}

export default ToyCard

