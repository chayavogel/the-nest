import { Link } from "react-router-dom";

function ToyCard({ toy }) {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img src={toy.image_url} className="card-img-top object-fit-cover border rounded" alt={toy.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{toy.name}</h5>
                <button type="button" className="btn btn-outline-primary p-0 me-2" style={{ width: '35px', height: '35px', borderRadius: '50%', overflow: 'hidden' }}>
                    <Link to={`/user_details/${toy.user.id}`} className="card-link d-block" style={{ width: '100%', height: '100%', backgroundImage: `url(${toy.user.profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></Link>
                </button>
                <div>
                    <Link className="card-link" to={`/toy_details/${toy.id}`}>View Toy</Link>
                    <a href={toy.link} className="card-link" target="_blank" rel="noopener noreferrer">Purchase</a>
                </div>
            </div>
        </div>
    );
}

export default ToyCard;
