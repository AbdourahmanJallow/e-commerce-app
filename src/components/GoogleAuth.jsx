import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from '../assets/svg/googleIcon.svg';

function GoogleAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            /* Authenticate with google */
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const userCredential = signInWithPopup(auth, provider);
            const user = (await userCredential).user

            /* Check for user in firestore database */
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef)
            if (!docSnap.exists()) { /* Create a user if not a database */
                setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });

                navigate('/')
            }
        } catch (error) {
            console.log(error.message)
            toast.error('Could not authorize with google')
        }
    };

    return (
        <div className="form-control mt-3">
            <p className="text-center mb-3">OR</p>
            <button
                type="submit"
                className="p-2 link-hover"
                onClick={onGoogleClick}
            >
                {location.pathname === "/sign-up" ? "Sign Up" : "Login"} with{" "}
                <img
                    src={googleIcon}
                    width="30"
                    className="inline-block mx-1"
                    alt="google icon"
                />
                oogle
            </button>
        </div>
    );
}

export default GoogleAuth;
