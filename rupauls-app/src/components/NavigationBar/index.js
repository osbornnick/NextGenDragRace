import React from "react";
import {Link} from "react-router-dom";
import "../../rupaul_look.css"

const NavigationBar = () => {
    return (
        <>
            <div>
                <Link to = "/queens" className="rp-home-link">
                    All Queens
                </Link>
            </div>
            <div>
                <Link to = "/seasons" className="rp-home-link">
                    All Seasons
                </Link>
            </div>
            <div>
                <Link to = "/discussion" className="rp-home-link">
                    Discussion Boards
                </Link>
            </div>
            <div>
                <Link to = "/about" className="rp-home-link">
                    About
                </Link>
            </div>
        </>
    );
}
export default NavigationBar;