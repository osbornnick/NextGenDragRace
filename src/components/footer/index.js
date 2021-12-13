import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12 col-xl-2">
                        <Link to="/privacy" className="px-3 text-muted">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="col-md-12 col-xl-1">
                        <Link to="/login" className="px-3 text-muted">
                            Login
                        </Link>
                    </div>
                    <div className="col-md-12 col-xl-3">
                        <span className="px-3">© 2021 Drag Homies Inc.</span>
                    </div>
                    <div className="col-md-12 col-xl-3">
                        <span className="px-3">
                            Powered by{" "}
                            <a href="https://drag-race-api.readme.io/docs">
                                NoKeyNoShade
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
