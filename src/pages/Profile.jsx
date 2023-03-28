import {useState, useEffect} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import  {ReactComponent as SignOutIcon} from "../assets/svg/arrow-left-svgrepo-com.svg";

function Profile() {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData;
    const navigate = useNavigate();

    const onSubmit =  () => {
        
    }

    const signOut = () => {
        auth.signOut();
        navigate('/')
    }

    return (
        <>
            <header className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">Profile</h1>
                <p
                    className="btn btn-sm bg-green-500 border-none hover:bg-emerald-500/95"
                    onClick={signOut}
                >
                    {/* <SignOutIcon width='35' fill='white'/> */}
                    Sign out
                </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 ">
                <div className="card p-3 rounded-lg shadow-lg bg-base-200">
                    <div className="card-body">
                        <div className="flex justify-between mb-4">
                            <h3 className="card-title">Personal Details</h3>
                            <div className="badge badge-info text-white font-semibold">
                                Owner
                            </div>
                        </div>
                        <div className="text-lg mb-3">
                            <p>{name}</p>
                            <p>{email}</p>
                        </div>
                        <Link to='/sell-item' className='link link-info'>Sell your property</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile