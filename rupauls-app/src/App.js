import HomeScreen from "./components/HomeScreen";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="container">
              <Routes>
                  <Route path="/" element={<HomeScreen />}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
