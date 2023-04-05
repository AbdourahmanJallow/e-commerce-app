import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import GoogleAuth from "../components/GoogleAuth";
import { ReactComponent as EyeIcon } from "../assets/svg/visibilityIcon.svg";

function Login() {
    const [isVisible, setIsVisible] = useState(false);
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

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential.user) {
                navigate("/");
            }
        } catch (error) {
            toast.error("Couldn't sign in...");
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="container mx-auto flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold p-3 dark:text-white">Login!</h1>
                    <form
                        onSubmit={onSubmit}
                        className="card-body shadow-2xl bg-base-100 dark:bg-slate-800 rounded-2xl"
                    >
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
                                type={isVisible ? `text` : `password`}
                                placeholder={`password`}
                                id="password"
                                value={password}
                                onChange={onChange}
                                className="relative input input-bordered"
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
                            <label className="label">
                                <Link
                                    to="/forgot-password"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                            <label className="label label-text-alt">
                                Don't have an account?
                                <Link to="/sign-up" className="">
                                    <span className="text-green-500 link link-hover">
                                        Sign up here
                                    </span>
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn bg-sky-400 border-none dark:text-white"
                            >
                                Sign in
                            </button>
                        </div>
                        {/* Google Authentication */}
                        <GoogleAuth />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
