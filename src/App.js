import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Profile from "./components/profile";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import queens from "./reducers/queens.js";

const reducer = combineReducers({ queens });
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
