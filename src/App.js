import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import SellItem from "./components/SellItem";
import ShoppingCart from "./pages/ShoppingCart";
import { CartProvider } from './context/CartContext'
import { useState, useEffect } from "react";
import Nav from "./components/layout/Nav";

function App() {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        onAddToCart()
    }, [])

    const onAddToCart = (item) => {
        const newCart = [...cartItems, item];
        setCartItems(newCart);
    }

    return (
        <>
            <CartProvider>
                <Router>
                    <div className="flex flex-col justify-between h-screen">
                        {/* <Navbar /> */}
                        <Nav />
                        <main className="container mx-auto px-6 ">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Explore
                                            // onAddToCart={onAddToCart}
                                            // cartItems={cartItems}
                                        />
                                    }
                                />
                                <Route to="/profile" element={<PrivateRoute />}>
                                    <Route
                                        path="/profile"
                                        element={<Profile />}
                                    />
                                </Route>
                                <Route
                                    path="/cart"
                                    element={
                                        <ShoppingCart cartItems={cartItems} />
                                    }
                                />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/sell-item"
                                    element={<SellItem />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<ForgotPassword />}
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
            <ToastContainer />
        </>
    );
}

export default App;
