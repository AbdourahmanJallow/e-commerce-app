import React from 'react'

function Footer() {
    const today = new Date();
    return (
        <footer className="footer footer-center p-5 bg-slate-800 text-xs text-white">
            <p className="">
                The Black Market <br />
                Copyright &copy; {today.getFullYear()} - All rights reseverd
            </p>
        </footer>
    );
}

export default Footer