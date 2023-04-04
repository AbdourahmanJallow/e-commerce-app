import {useState, useEffect} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { motion } from 'framer-motion';
import defaultProfile from '../assets/jpg/profile.png';

function Profile() {
    const auth = getAuth();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoUrl: auth.currentUser.photoURL
    })

    const { name, email, photoUrl } = formData;
    const navigate = useNavigate();
    useEffect(() => {
        console.log(auth)
    })

    const signOut = () => {
        auth.signOut();
        navigate('/')
    }

    return (
        <>
            <main className="my-10">
                <header className="flex justify-between mb-4">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <motion.button
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        whileHover={{
                            scale: 0.9,
                            transition: { duration: 0.4 }
                        }}
                        transition={{ ease: "easeOut", duration: 2 }}
                        className="p-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:bg-indigo-700 rounded-md text-white"
                        onClick={signOut}
                    >
                        <BsBoxArrowLeft className="inline mx-1" size={27} />
                        Sign out
                    </motion.button>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 ">
                    <div className="card p-3 rounded-lg shadow-lg bg-base-200">
                        <div className="card-body">
                            <div className="flex justify-between mb-4">
                                <h3 className="card-title">Personal Details</h3>
                                <div className="avatar online">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={
                                                photoUrl
                                                    ? photoUrl
                                                    : defaultProfile
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg mb-3">
                                <p>{name}</p>
                                <p>{email}</p>
                            </div>
                            <motion.button
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                whileHover={{
                                    scale: 0.9,
                                    transition: { duration: 0.4 }
                                }}
                                transition={{ ease: "easeOut", duration: 1 }}
                                className="mt-3 self-start"
                            >
                                <Link
                                    to="/sell-item"
                                    className=" bg-indigo-700 py-3 px-4 rounded-md text-white"
                                >
                                    Sell your property{" "}
                                    <RiMoneyDollarCircleLine
                                        size={25}
                                        className="inline"
                                    />
                                </Link>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile
