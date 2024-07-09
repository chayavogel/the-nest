import { Link } from "react-router-dom";

function MyToyCard({ toy }) {

    function handleDeleteClick() {
        fetch(`/toys/${toy.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // .then(response => {
        //     if (response.ok) {
        //         onDelete(toy.id); // Call the onDelete prop to remove the toy from the parent component's state
        //     } else {
        //         response.json().then(errorData => {
        //             console.error("Error deleting toy:", errorData);
        //         });
        //     }
        // })
        // .catch(error => {
        //     console.error("Network error:", error);
        // });
    }

    return (
        <div className="card" style={{ width: '18rem' }}>
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img src={toy.image_url} className="card-img-top object-fit-cover border rounded" alt={toy.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{toy.name}</h5>
                <div>
                    <Link className="card-link" to={`/toy_details/${toy.id}`}>View Toy</Link>
                    <a href={toy.link} className="card-link" target="_blank" rel="noopener noreferrer">Purchase</a>
                    <br/>
                    <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default MyToyCard;