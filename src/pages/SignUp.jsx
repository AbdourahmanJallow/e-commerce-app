import React from "react";
import { db } from "../firebase.config";
import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import { ReactComponent as EyeIcon } from "../assets/svg/visibilityIcon.svg";

function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
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

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            /* REGISTER USER */
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            });

            /* Make a copy of formData */
            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();

            /* Store in firestore */
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            toast.success("Sign up Successfull!");
            navigate("/");
        } catch (error) {
            console.log(error.message);
            toast.error("Registration Failed. Please try again");
        }
    };

    return (
        <div className="">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="md:text-5xl text-3xl font-bold dark:text-white">Sign Up Now!</h1>
                </div>
                <div className="card flex-shrink-0 shadow-2xl bg-base-100 dark:bg-slate-800">
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
                            <div className="form-control relative">
                                <input
                                    type={isVisible ? 'text' : 'password'}
                                    placeholder="password"
                                    id="password"
                                    value={password}
                                    onChange={onChange}
                                    className="input input-bordered"
                                    required
                                />
                                <EyeIcon
                                    className="absolute top-3 right-2"
                                    width="30"
                                    fill="black"
                                    onClick={() =>
                                        setIsVisible((prevState) => !prevState)
                                    }
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-sky-400 border-none dark:text-white"
                                >
                                    Sign Up
                                </button>
                            </div>
                            {/* Google Authentication */}
                            <GoogleAuth />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
