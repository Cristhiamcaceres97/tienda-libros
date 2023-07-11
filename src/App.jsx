import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./Components/Inicio";
import Navegacion from "./Components/BarraDeNavegacion";
import BookList from "./Components/BookList";
import BooksDetails from "./Components/BooksDetails";
import Pago from "./Components/Pago";


const App = () => {
  return (
    <Router>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/bookDetails/:id" element={<BooksDetails />} />
        <Route path="/pago" element={<Pago />} />
      </Routes>
    </Router>
  );
};

export default App;
