function UserDetailsCard( {user} ) {

    return (
        <>
        <img src={user.profile_picture} alt="User Avatar" />
        <p>{user.firstname} {user.lastname}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Country:</strong> {user.country}</p>
        </>
    )
}

export default UserDetailsCard;