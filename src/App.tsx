
import { Routes, Route } from "react-router-dom";

import Customers from "./components/Customers";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Rentals from "./components/Rentals";
import NoPage from "./components/NoPage";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";

import "./App.css";
function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route index element={<Movies />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
