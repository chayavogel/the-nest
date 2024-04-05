import UsersToyCard from "./UsersToyCard";

function UserDetailsCard( {user} ) {

    const toys = user.toys

    return (
        <>
        <img src={user.profile_picture} alt="User Avatar" />
        <p>{user.firstname} {user.lastname}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Country:</strong> {user.country}</p>
        <p>{user.firstname}'s Toy Recommendations</p>
        {toys && toys.map(toy => <UsersToyCard key={toy.id} toy={toy}/>)}
        </>
    )
}

export default UserDetailsCard;