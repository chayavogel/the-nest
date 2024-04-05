import { Link } from "react-router-dom";

function UsersToyCard({ toy }) {
    
    return (
        <>
        <p>{toy.name}</p>
        <img src={toy.image_url} alt={toy.name} />
        <a href={toy.link} target="_blank" rel="noopener noreferrer">Purchase</a>
        <Link to={`/toy_details/${toy.id}`}>Details</Link>
        </>
    );
}

export default UsersToyCard