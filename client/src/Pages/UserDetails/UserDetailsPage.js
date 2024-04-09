import { useEffect } from "react";
import UserDetailsCard from "./UserDetailsCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../Slices/UsersSlice"
import { useParams } from "react-router-dom";
import NavBar from "../../NavBar";

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
    
    return (
        <>
        <NavBar/>
        {user && <UserDetailsCard user={user} />}
        </>
    )
}

export default UserDetailsPage