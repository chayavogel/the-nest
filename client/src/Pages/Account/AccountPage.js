import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchCurrentUser, deleteAccount } from "../../Slices/UsersSlice"
import AccountDetails from './AccountDetails'
import EditAccountForm from './EditAccountForm'
import MyToyCards from './MyToyCards'

function AccountPage() {
    const currentUser = useSelector((state) => state.users.currentUser)
    const error = useSelector((state) => state.users.error)
    const dispatch = useDispatch()
    const [selectedSection, setSelectedSection] = useState('account')

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    function handleSectionClick(section) {
        setSelectedSection(section);
    }

    function handleDelete() {
        dispatch(deleteAccount());
    }

    return (
        <>
            <div className="container text-center my-3">
                <h3>Account</h3>
            </div>

            <div className="d-flex justify-content-center my-3">
                <AccountDetails user={currentUser}/>
            </div>

            <div className="text-center my-3">
                <button type="button" className="btn btn-primary me-2" onClick={() => handleSectionClick('account')}>Account</button>
                <button type="button" className="btn btn-primary me-2" onClick={() => handleSectionClick('toyPosts')}>My Posts</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
                <p className="text-danger mt-2">{error === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON" ? "Server Down!" : null}</p>
            </div>

            // Selected Section Renders Here
            <div className="my-3">
                {selectedSection === 'account' && (
                    <EditAccountForm user={currentUser}/>
                )}
                {selectedSection === 'toyPosts' && (
                    <MyToyCards user={currentUser}/>
                )}
            </div>
        </>
    )
}

export default AccountPage
