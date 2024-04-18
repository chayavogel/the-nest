function AccountDetails( {user} ) {
    return (
        <>

        <div className="card" style={{ width: "20rem" }}>
        <img src={user.profile_picture} className="card-img-top object-fit-cover border rounded" alt={user.firstname + " " + user.lastname} />
        <div className="card-body">
            <h5 className="card-title">{user.firstname} {user.lastname}</h5>
            <p className="card-text">{user.bio}</p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">{user.country}</li>
            <li className="list-group-item">{user.email}</li>
        </ul>
        </div>

        </>
    )
}

export default AccountDetails
