import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Components/Inicio";
import Navegacion from "./Components/BarraDeNavegacion";
import BookList from "./Components/BookList";

const App = () => {
  return (
    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;
