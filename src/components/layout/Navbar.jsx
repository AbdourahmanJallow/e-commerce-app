import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileIcon } from '../../assets/svg/personIcon.svg';
import { BsBoxArrowRight } from "react-icons/bs";
import { MdOutlineExplore } from 'react-icons/md'
import { FaShoppingCart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { GoPerson } from "react-icons/go";

function Navbar() {
    const [open, setOpen] = useState(true);
    const [clicked, setClicked] = useState(false)

    return (
        <div className="relative navbar border-b bg-slate-100 text-whiteq">
            <div className="container mx-auto px-6">
                <div className="flex-1">
                    <Link>
                        <h3 className="text-2xl font-bold">
                            <FaShoppingCart size={45} fill="black" />
                        </h3>
                    </Link>
                </div>
                <nav className="flex-none">
                    <div className="flex justify-end">
                        <ul className=''>
                            <li className="btn rounded-btn btn-sm border-none hover:text-lg transition-all mx-1">
                                <Link to="/" className="">
                                    Explore
                                    <MdOutlineExplore
                                        className="inline ml-1"
                                        fill="black"
                                        size={30}
                                    />
                                </Link>
                            </li>
                            <li className="btn rounded-btn btn-sm border-none transition-all mx-1 hover:text-lg">
                                <Link to="/profile" className="">
                                    Profile
                                    <GoPerson
                                        className="inline ml-1"
                                        // fill="white"
                                        size={30}
                                    />
                                </Link>
                            </li>
                            <li className="btn rounded-btn btn-sm border-none transition-all mx-1 hover:text-lg">
                                <Link to="/cart">
                                    Cart
                                    <FaShoppingCart
                                        className="inline ml-1"
                                        // fill="white"
                                        size={30}
                                    />
                                </Link>
                            </li>
                            <li className="btn rounded-btn btn-sm border-none transition-all mx-1 hover:text-lg">
                                <Link to="/login">
                                    Sign in
                                    <BsBoxArrowRight
                                        className="inline ml-1"
                                        // fill="white"
                                        size={30}
                                    />
                                </Link>
                            </li>
                        </ul>
                        <div
                            className="md:hidden flex justify-center items-center cursor-pointer"
                            onClick={() => setClicked(!clicked)}
                        >
                            {clicked ? <FaTimes /> : <HiMenuAlt1 />}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
