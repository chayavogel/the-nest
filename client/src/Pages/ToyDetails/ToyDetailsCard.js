import { Link } from "react-router-dom";

function ToyDetailsCard( { toy } ) {

    return (
        <>
        <p>{toy.name}</p>
        <img src={toy.image_url} alt={toy.name} />
        <a href={toy.link} target="_blank" rel="noopener noreferrer">Purchase</a>
        <p>{toy.brand}</p>
        <p>{toy.description}</p>
        <Link to={`/user_details/${toy.user.id}`}><img src={toy.user.profile_picture} alt={toy.user.firstname + " " + toy.user.lastname} /></Link>
        <p>{toy.user.firstname} {toy.user.lastname}</p>
        <p>Comments</p>
        <ul>
          {toy.reviews.map((review) => (
            <li key={review.id}>
              <p>Title: {review.title}</p>
              <p>Content: {review.body}</p>
            </li>
          ))}
        </ul>
        </>
    );

}

export default ToyDetailsCard