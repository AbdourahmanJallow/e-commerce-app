import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email);
            toast.success('Email sent successfully');
            navigate('/')
        } catch (error) {
            console.log(error.message)
            toast.error('Could not send email')
        }
    }

    return (
        <div className="grid grid-cols place-content-center card shadow-lg rounded-lg p-3">
            <div className="">
                <h3 className="text-2xl font-semibold text-center">Forgot Password</h3>
                <form className="card-body" onSubmit={onSubmit}>
                    <div className="form-control">
                        <input
                            type="text"
                            placeholder="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-outline">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
