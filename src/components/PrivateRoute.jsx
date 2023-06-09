import useAuthStatus from "../hooks/useAuthStatus"
import { Navigate, Outlet } from "react-router-dom"
import Spinner from "./Spinner"

function PrivateRoute() {
    const { loggedIn, loading } = useAuthStatus();

    if (loading) {
        return <Spinner />
    }
    return (
        loggedIn ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute