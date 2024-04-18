import UsersToyCard from "./UsersToyCard"

function UsersToys( { user } ) {

    const toys = user.toys

    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                { toys? toys.map(toy => <UsersToyCard key={toy.id} toy={toy}/>) : <i>{user.firstname} has not yet posted any toys</i>}
            </div>
        </div>
    )
}

export default UsersToys