import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {toast} from 'react-toastify'
import GoogleAuth from "../components/GoogleAuth";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Couldn\'t sign in...')
            console.log(error.message)
        }
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login Now!</h1>
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
                                <label className="label">
                                    <Link
                                        to="/forgot-password"
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot password?
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-sky-400 border-none"
                                >
                                    Login
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

export default Login;