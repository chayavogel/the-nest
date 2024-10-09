import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { fetchReviews } from "../../Slices/ReviewsSlice";
import { useSelector, useDispatch } from 'react-redux'


function ToyDetailsCard( { toy } ) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const allReviews = useSelector(state => state.reviews.value)
  const reviews = allReviews.filter(review => review.toy.id == toy.id)

    return (
      <>

      <div className = "container text-center">

        <div className = "row">

          <div className="card col">
            <img src={toy.image_url} alt={toy.name} className="card-img-top object-fit-cover border rounded" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div className="card-body">
              <h5 className="card-title">{toy.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">Brand: {toy.brand}</h6>
              <button type="button" className="btn btn-primary p-0" style={{ width: '35px', height: '35px', borderRadius: '50%', overflow: 'hidden' }}>
                    <Link to={`/user_details/${toy.user.id}`} className="card-link d-block" style={{ width: '100%', height: '100%', backgroundImage: `url(${toy.user.profile_picture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></Link>
                </button>
                <span className="ms-2">By {toy.user.firstname} {toy.user.lastname}</span>
              <p className="card-text">{toy.description}</p>
              <ul className="list-group list-group-flush">
                {toy.age_ranges.map((age) => {
                  return <li key={age.id} className="list-group-item">{age.age}</li>
                })}
              </ul>
              <a className="btn btn-primary" href={toy.link} target="_blank" rel="noopener noreferrer">Purchase</a>
            </div>
          </div>

          <div className="card col">
              <div className="card-body">
                <h5 className="card-title">Purchased the Toy? Post a Review!</h5>
                <p className="card-text">Reviews like yours help other moms decide if this toy is right for their child</p>
                <ReviewForm toy_id={toy.id} />
              </div>
          </div>

        </div>

      </div>
      
      <div className="card col">
        <div className="card-header">
          Reviews
        </div>
        {reviews && reviews.length > 0 ?
        <ul className="list-group list-group-flush">
        {reviews.map((review) => (
          <li className="list-group-item" key={review.id}>
            <p><em>{review.user.firstname} {review.user.lastname}</em></p>
            <p><strong>{review.title}</strong></p>
            <p>{review.body}</p>
          </li>
        ))}
        </ul>
      :
      <ul>
        <br/>
        <li className="list-group-item">
            <p><em>Be the first to leave a review!</em></p>
        </li>
      </ul>
      } 
        
      </div>
      
      </>
    );
}

export default ToyDetailsCard