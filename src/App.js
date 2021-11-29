import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
