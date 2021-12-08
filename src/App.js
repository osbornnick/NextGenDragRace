import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import { OtherProfile, MyProfile } from "./components/profile";
import Details from "./components/details";
import Navbar from "./components/navigation";
import Register from "./components/register";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import queens from "./reducers/queens.js";
import queen from "./reducers/queen.js";
import currentUser from "./reducers/currentUser.js";
import comments from "./reducers/comments.js";
import UserListener from "./components/UserListener";

const reducer = combineReducers({ queens, queen, currentUser, comments });
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <UserListener />
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<MyProfile />} />
                        <Route path="profile/:id" element={<OtherProfile />} />
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
