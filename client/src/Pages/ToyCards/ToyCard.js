import { Link } from "react-router-dom";

function ToyCard({ toy }) {
    
    return (
        <>
        <p>{toy.name}</p>
        <img src={toy.image_url} alt={toy.name} />
        <a href={toy.link} target="_blank" rel="noopener noreferrer">Purchase</a>
        <Link to={`/user_details/${toy.user.id}`}><img src={toy.user.profile_picture} alt={toy.user.firstname + " " + toy.user.lastname} /></Link>
        <Link to={`/toy_details/${toy.id}`}>Details</Link>
        </>
    );
}

export default ToyCard

