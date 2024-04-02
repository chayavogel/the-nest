function ToyCard({ toy }) {
    
    return (
        <>
            <p>{toy.name}</p>
        <a href={toy.image_url} className="image-button"><img src={toy.image_url} alt={toy.name} /></a>
            <a href={toy.link}>Purchase</a>
        <a href={toy.user.profile_picture}><img src={toy.user.profile_picture} alt={toy.user.firstname + " " + toy.user.lastname} /></a>
            <button>Details</button>
        </>
    );
}

export default ToyCard

// user profile photo link will be replaced with a route to the user details page of that user

// button details will be replaced with a route to the toy details page of that toy