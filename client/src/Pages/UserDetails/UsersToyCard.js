import { Link } from "react-router-dom";

function UsersToyCard({ toy }) {
    
    return (
        <>
        <p>{toy.name}</p>
        <a href={toy.image_url} className="image-button"><img src={toy.image_url} alt={toy.name} /></a>
        <a href={toy.link}>Purchase</a>
        <Link to={`/toy_details/${toy.id}`}>Details</Link>
        </>
    );
}

export default UsersToyCard