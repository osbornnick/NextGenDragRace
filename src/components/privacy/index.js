import React from "react";
import PolicyNavigation from "./policy_navigation";
import Intro from "./intro";
import Collect from "./collect";
import Use from "./use";
import Disclosure from "./disclosure";
import Protect from "./protect";

const Privacy = () => {
    return (
        <>
            <div className="row mt-3">
                <div className="col-lg-4">
                    <PolicyNavigation />
                </div>
                <div className="col-lg-8">
                    <a name="top"></a>
                    <h2>Drag Homies Privacy Policy</h2>
                    <i>Last updated December 5, 2021</i>
                    <Intro />
                    <Collect />
                    <Use />
                    <Disclosure />
                    <Protect />
                </div>
            </div>
        </>
    );
};

export default Privacy;
