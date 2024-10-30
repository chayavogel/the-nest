import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../Slices/UsersSlice"
import { useParams } from "react-router-dom";
import UserDetailsCard from "./UserDetailsCard"
import UsersToys from "./UsersToys";

function UserDetailsPage() {

    const params = useParams();
    const userId = params.id;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);

    const user = useSelector(state =>
        state.users.users.find(user => user.id === parseInt(userId))
    );

    let toys

    if (user) {
        toys = user.toys
    }

    return (
        <>
        <div className="row justify-content-center">
            {user && <UserDetailsCard user={user} />}
        </div>
        <br/>

        <div className="container text-center">
            <h5>{user && user.firstname}'s Toy Recommendations</h5>
            {user && <UsersToys user={user} />}
        </div>
        </>
    )
}

export default UserDetailsPage