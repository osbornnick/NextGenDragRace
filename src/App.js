import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import Details from "./components/details";
import Navbar from "./components/navigation";
import Register from "./components/register";
import { Provider, useDispatch } from "react-redux";
import { createStore, combineReducers } from "redux";
import queens from "./reducers/queens.js";
import queen from "./reducers/queen.js";
import user from "./reducers/user.js";
import UserListener from "./components/UserListener";

const reducer = combineReducers({ queens, queen, user });
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserListener />
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="register" element={<Register />} />
                        <Route path="details/:id" element={<Details />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
