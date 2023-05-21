import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import AboutPage from "./components/AboutPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <h1>Weather App V2</h1>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
