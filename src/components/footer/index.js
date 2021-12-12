import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container d-flex justify-content-center">
                <Link to="/privacy" className="px-3 text-muted">
                    Privacy Policy
                </Link>
                <Link to="/login" className="px-3 text-muted">
                    Login
                </Link>
                <span className="px-3">© 2021 Drag Homies Inc.</span>
            </div>
        </footer>
    );
};

export default Footer;
