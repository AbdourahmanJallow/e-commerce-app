import { useState } from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import { GoPerson } from "react-icons/go";
import { CartState } from "../../context/CartContext";
import { motion } from "framer-motion";

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        state: { cartItems },
        dispatch
    } = CartState();

    const variants = {
        open: { opacity: 1, x: 0 },
        // closed: { opacity: 0, x: "-100%", transition: 'ease', duration: 1 }
    };

    return (
        <header className="bg-slate-200 p-2">
            <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
                <div>
                    <Link to='/'>
                        <FaShoppingCart
                            size={40}
                            className="w-16"
                            fill="darkorange"
                        />
                    </Link>
                </div>
                <motion.div
                    animate={isOpen ? "open" : "closed"}
                    variants={variants}
                    transition={{
                        ease: "easeOut",
                        duration: 1
                    }}
                    className={` md:static md:min-h-fit md:w-auto absolute min-h-[40vh] bg-slate-800 md:bg-white md:rounded-md left-0 ${
                        isOpen ? `top-[90px]` : `top-[-100%]`
                    }
                    w-full flex items-center justify-center px-5 z-10`}
                >
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 p-3">
                        <li className="text-white md:text-black">
                            <Link className="hover:text-gray-500" to="/">
                                Explore
                                <MdOutlineExplore className="inline-block text-xl mx-1" />
                            </Link>
                        </li>
                        <li className="text-white md:text-black">
                            <Link className="hover:text-gray-500" to="/profile">
                                Profile
                                <GoPerson className="inline-block text-xl mx-1" />
                            </Link>
                        </li>
                        <li className="text-white md:text-black">
                            <Link
                                className="wrapper hover:text-gray-500"
                                to="/cart"
                            >
                                Cart
                                <HiOutlineShoppingCart
                                    className="inline-block text-xl mx-1"
                                    value={5}
                                />
                                {cartItems.length > 0 && (
                                    <span
                                        className="badge badge-info"
                                        id="lblCartCount"
                                    >
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </motion.div>
                <div className="flex items-center gap-6">
                    <button className="bg-slate-800 text-white px-5 py-2 rounded-full hover:bg-slate-700">
                        <Link to="/login">Sign in</Link>
                        <BsBoxArrowRight className="inline-block text-2xl mx-1" />
                    </button>
                    <div
                        className="md:hidden"
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        {isOpen ? (
                            <FaTimes className="text-3xl cursor-pointer" />
                        ) : (
                            <HiMenuAlt1
                                className="text-3xl cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Nav;
