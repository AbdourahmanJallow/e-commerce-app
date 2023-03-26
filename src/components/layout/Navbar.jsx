import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar border-b bg-slate-800 text-white">
            <div className="container mx-auto px-6">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold">E-Commerce</h3>
                </div>
                <div className="flex-none">
                    <div className="flex justify-end">
                        <Link
                            to="/"
                            className="btn rounded-btn btn-sm bg-slate-800 border-none"
                        >
                            Explore
                        </Link>
                        <Link
                            to="/profile"
                            className="btn rounded-btn btn-sm bg-slate-800 border-none"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/offer"
                            className="btn rounded-btn btn-sm bg-slate-800 border-none"
                        >
                            Offers
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
