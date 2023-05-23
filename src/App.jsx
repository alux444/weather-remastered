import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import AboutPage from "./components/AboutPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router basename="/weather-remastered">
        <NavBar />
        <h1 className="main-header">Weather App V2</h1>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
