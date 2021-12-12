import React from "react";
import "./privacy.css"

const Policy_navigation = () => {
    return (
        <>
            <div className="list-group policy-nav-board">
                <a className="list-group-item" href="#collect">
                    What We collect
                </a>
                <a className="list-group-item" href="#use">
                    Use of Your Information
                </a>
                <a className="list-group-item" href="#disclosure">
                    Disclosure of Your Information
                </a>
                <a className="list-group-item" href="#protect">
                    How We Protect Your Information
                </a>
            </div>
        </>
    );
};

export default Policy_navigation;