import './App.css';
import { Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {MoviesPage} from "./pages/MoviesPage";
import {MoviePage} from "./pages/MoviePage";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
            </Routes>
        </div>
    );
}

export default App;