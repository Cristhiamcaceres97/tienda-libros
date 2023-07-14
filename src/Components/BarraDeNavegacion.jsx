import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  InputBase,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Search} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import "./BarraDeNavegacion.css";

const Navegacion = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [showResultados, setShowResultados] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=9`
      );

      console.log(response.data);

      const booksData = response.data.items;
      setResultados(booksData);
      setShowResultados(true);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (busqueda.length >= 4) {
      handleSearch();
    }
  };

  const handleVerDetalle = (bookId) => {
    window.location.href = `/bookDetails/${bookId}`;
  };

  const renderDesktopMenu = () => {
    return (
      <>
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          sx={{ "&:hover": { backgroundColor: "blue" }, marginLeft: "5px" }}
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          sx={{ "&:hover": { backgroundColor: "green" }, marginLeft: "5px" }}
        >
          Ayuda
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          sx={{ "&:hover": { backgroundColor: "green" }, marginLeft: "5px" }}
        >
          Contacto
        </Button>
      </>
    );
  };

  const renderMobileMenu = () => {
    return (
      <>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            <ListItem
              button
              component={NavLink}
              style={{ marginRight: "10px" }}
            >
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              style={{ marginRight: "10px" }}
            >
              <ListItemText primary="Ayuda" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              style={{ marginRight: "30px" }}
            >
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  };

  const renderResultados = () => {
    if (!showResultados) {
      return null;
    }

    return (
      <div className="resultados-container">
        {resultados.map((libro) => (
          <div key={libro.id} className="libro-item">
            <img
              src={libro.volumeInfo.imageLinks?.thumbnail}
              alt={libro.volumeInfo.title}
              className="libro-imagen"
            />
            <div className="libro-info">
              <h2 className="libro-titulo">{libro.volumeInfo.title}</h2>
              <p className="libro-autor">
                Autor: {libro.volumeInfo.authors?.join(", ") || "NO DISPONIBLE!!"}
              </p>
              <p className="libro-publicacion">
                Publicación: {libro.volumeInfo.publishedDate || "NO DISPONIBLE!!"}
              </p>
              <Button
                variant="contained"
                onClick={() => handleVerDetalle(libro.id)}
              >
                Ver más detalles
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="navegacion-container">
      <AppBar position="fixed" className="navbar">
        <Toolbar>
          <Button
            component={NavLink}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "left", marginRight: "250px" }}
          >
            Paco's Book
          </Button>
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
              className="buscador"
            >
              Buscar
            </Button>
          </form>
          {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </Toolbar>
      </AppBar>
      {renderResultados()}
    </div>
  );
};

export default Navegacion;
