import footerIcon from '../../assets/jpg/store-o.png';
function Footer() {
    const today = new Date();
    return (
        <footer className="footer footer-center p-5 bg-slate-800 text-xs text-white">
            <div>
                <img className='mb-3' src={footerIcon} width='50' alt="footerIcon" />
                <p className="">
                    The Black Market <br />
                    Copyright &copy; {today.getFullYear()} - All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer