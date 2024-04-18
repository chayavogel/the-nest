import NavBar from "../NavBar"
import { useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from "../Slices/UsersSlice"
import About from "./About"

function AboutPage() {

    const users = useSelector(state => state.users.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const memberCount = users.length

    return (
        <>
        <div>
        <About memberCount={memberCount}/>
        </div>
        </>
    )
}

export default AboutPage