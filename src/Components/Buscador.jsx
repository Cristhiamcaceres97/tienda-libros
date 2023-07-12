import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "@mui/material/styles";
import "./Buscador.css";

const Buscador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResultados, setShowResultados] = useState(false);
  const [showComponentes, setShowComponentes] = useState(true);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${busqueda}&limit=9`
      );

      const data = response.data.docs;
      setResultados(data);
      setShowResultados(true); 
      setShowComponentes(false); 
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (busqueda.length >= 4) {
      handleSearch();
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderResultados = () => {
    if (!showResultados) {
      return null;
    }

    return (
      <div className="buscador-container">
        {resultados.map((libro) => (
          <div key={libro.key} className="libro-item">
            <img
              src={`http://covers.openlibrary.org/b/ID/${libro.cover_i}-M.jpg`}
              alt={libro.title}
              className="libro-imagen"
            />
            <div className="libro-info">
              <h2 className="libro-titulo">{libro.title}</h2>
              <p className="libro-autor">
                Autor: {libro.author_name?.join(", ")}
              </p>
              <p className="libro-publicacion">
                Publicación: {libro.first_publish_year}
              </p>
              <p className="libro-precio">Precio: No disponible</p>
  
              <div className="botones-libro">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => agregarAlCarrito(libro)}
                >
                  Añadir al carrito
                </Button>
                <Button variant="outlined" onClick={() => verDetalles(libro)}>
                  Ver más detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Tienda
          </Typography>
          <form onSubmit={handleSubmit} className="search-form">
            <InputBase
              type="text"
              placeholder="Buscar libro..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              sx={{ marginRight: 1 }}
              className="search-input"
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<Search />}
              className="search-button"
              disabled={busqueda.length < 4}
            >
              Buscar
            </Button>
          </form>
        </Toolbar>
      </AppBar>

      {renderResultados()}

      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Advertencia</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            El término de búsqueda debe tener al menos 4 caracteres.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Buscador;
