import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import user from "./reducers/users.js";

const reducer = combineReducers({ user });
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
