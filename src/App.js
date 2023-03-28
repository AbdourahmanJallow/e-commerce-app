import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import SellItem from "./components/SellItem";

function App() {
    return (
        <>
            <Router>
                <div className="flex flex-col justify-between h-screen">
                    <Navbar />
                    <main className="container mx-auto px-6">
                        <Routes>
                            <Route path="/" element={<Explore />} />
                            <Route to='/profile' element={<PrivateRoute />}>
                                <Route path="/profile" element={<Profile />} />
                            </Route>
                            <Route path="/offer" element={<Offers />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sell-item" element={<SellItem />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
