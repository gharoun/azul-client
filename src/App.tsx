import "./App.css";
import Customers from "./components/Customers";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Rentals from "./components/Rentals";
import NoPage from "./components/NoPage";
function App() {
  return (
    <main className="container">
      <NavBar />
      <Routes>
        <Route path="/Movies" element={<Movies />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/" element={<Movies />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </main>
  );
}

export default App;
