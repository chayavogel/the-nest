import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchCurrentUser, deleteAccount } from "../../Slices/UsersSlice"
import AccountDetails from './Account Details'
import EditAccountForm from './EditAccountForm'
import MyToyCards from './MyToyCards'

function AccountPage() {

    const currentUser = useSelector((state) => state.users.currentUser)
    const error = useSelector((state) => state.users.error)
    const dispatch = useDispatch()
    const [activeSection, setActiveSection] = useState('account')

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    function handleSectionClick(section) {
        setActiveSection(section);
    }

    function handleDelete() {
        dispatch(deleteAccount());
    }

    return (
        <>

        <div className="cont
        
        ainer text-center">
            <h3>Account</h3>
        </div>

        <br/>

        <div className="d-flex justify-content-center">
            <AccountDetails user={currentUser}/>
        </div>

        <br/>

        <button type="button" className="btn btn-primary" onClick={() => handleSectionClick('account')}>Account</button>
        <button type="button" className="btn btn-primary" onClick={() => handleSectionClick('toyPosts')}>My Posts</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
        <p className={`text-danger`}>{error === "Unexpected token 'P', \"Proxy erro\"... is not valid JSON" ? "Server Down!" : null}</p>

        <br/>

        <div>
            {activeSection === 'account' && (
                <EditAccountForm user={currentUser}/>
            )}
            {activeSection === 'toyPosts' && (
                <MyToyCards user={currentUser}/>
            )}
        </div>

        </>
    )
}

export default AccountPage