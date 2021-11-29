import React from "react";

const Login = () => {
    console.log("render login");
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <img src="/images/rupaul.jpg" alt="rupauls logo" />
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <form>
                        <div className="mb-3">
                            <label
                                for="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                        </div>
                        <div className="mb-3">
                            <label for="pword" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="pword"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
