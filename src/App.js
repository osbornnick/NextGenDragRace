import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./components/login";
function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Route path="/login" component={Login} />
            </div>
        </BrowserRouter>
    );
}

export default App;
