import React from "react";
import { db } from "../firebase.config";
import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";


function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            /* REGISTER USER */
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            })

            /* Make a copy of formData */
            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            /* Store in firestore */
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            toast.success("Sign up Successfull!");
            navigate('/')
        } catch (error) {
            console.log(error.message);
            toast.error("Registration Failed. Please try again");
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div>
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="name"
                                    id="name"
                                    value={name}
                                    onChange={onChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="email"
                                    id="email"
                                    value={email}
                                    onChange={onChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="password"
                                    id="password"
                                    value={password}
                                    onChange={onChange}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-sky-400 border-none"
                                >
                                    Sign Up
                                </button>
                            </div>
                            {/* <div className="form-control mt-3">
                                <p className="text-center mb-3">OR</p>
                                <button
                                    type="submit"
                                    className="btn bg-sky-400 border-none"
                                >
                                    Sign In With Google
                                </button>
                            </div> */}
                            <GoogleAuth />
                            {/* Google Authentication */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
