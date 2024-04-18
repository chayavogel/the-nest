import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCurrentUser } from "../../Slices/UsersSlice"
import AccountDetails from './Account Details'
import EditAccountForm from './EditAccountForm'
import NavBar from '../../NavBar'
import { deleteAccount } from '../../Slices/UsersSlice'

function AccountPage() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const error = useSelector((state) => state.users.error)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    function handleDeleteClick() {
        dispatch(deleteAccount())
    }

    return (
        <>

        <div className="d-flex justify-content-center">
        <AccountDetails user={currentUser}/>
        </div>

        <br/>

        <div>
        <EditAccountForm user={currentUser}/>
        <button className="btn btn-danger" onClick={handleDeleteClick}>Delete Account</button>
        <p className={`text-danger`}>{error === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON" ? "Server Down!" : null}</p>
        </div>
        </>
    )
}

export default AccountPage