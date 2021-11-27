import React from "react";
import NavigationBar from "../NavigationBar";

const HomeScreen = () => {
    return (
        <>
        <div className="row mt-2">
            <div className="col-6">
                <img src="../../../public/images/rupaul.jpg"
                        height="100px"
                        width="100px"
                        alt="Image goes here"/>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-6">
                        <button type = "button" className="btn btn-primary btn-lg">
                            Login
                        </button>
                    </div>
                    <div className="col-6">
                        <button type = "button" className="btn btn-primary btn-lg">
                            Sign Up
                        </button>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <NavigationBar/>
                </div>
            </div>
        </div>
        </>
    );
};

export default HomeScreen;