import React from "react";
import "./privacy.css";

const PolicyNavigation = () => {
    return (
        <>
            <div className="list-group policy-nav-board d-none d-lg-block">
                <a
                    className="list-group-item list-group-item-action"
                    href="#top"
                >
                    <i className="fas fa-arrow-up"></i>
                </a>
                <a
                    className="list-group-item list-group-item-action"
                    href="#collect"
                >
                    What We collect
                </a>
                <a
                    className="list-group-item list-group-item-action"
                    href="#use"
                >
                    Use of Your Information
                </a>
                <a
                    className="list-group-item list-group-item-action"
                    href="#disclosure"
                >
                    Disclosure of Your Information
                </a>
                <a
                    className="list-group-item list-group-item-action"
                    href="#protect"
                >
                    How We Protect Your Information
                </a>
            </div>
        </>
    );
};

export default PolicyNavigation;
