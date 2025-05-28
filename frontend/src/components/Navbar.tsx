import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import "./styles/Navbar.css";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Fitness Tracker</Link>
            <div className={`navbar-links ${open ? "active" : ""}`}>
                <Link to="/" onClick={closeMenu}>Home</Link>
                <Link to="/create" onClick={closeMenu}>Add new activity</Link>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                {
                    open ? <AiOutlineClose /> : <AiOutlineMenu />
                }
            </button>
        </nav>
    );
};

export default Navbar;
