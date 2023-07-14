import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  InputBase,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import axios from "axios";
import "@mui/material/styles";

const Navegacion = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [showResultados, setShowResultados] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > window.innerHeight * 0.1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=9`
      );

      const booksData = response.data.items;
      const results = booksData.map((bookData) => {
        const title = bookData.volumeInfo.title;
        const authors = bookData.volumeInfo.authors?.slice(0, 2).join(", ");
        const publishedDate = bookData.volumeInfo.publishedDate;
        const coverUrl = bookData.volumeInfo.imageLinks?.thumbnail;

        return {
          title,
          authors,
          publishedDate,
          coverUrl,
        };
      });

      setResultados(results);
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

  const renderDesktopMenu = () => {
    return (
      <>
        <Button color="inherit" component={NavLink} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={NavLink}>
          Ayuda
        </Button>
        <Button color="inherit" component={NavLink}>
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
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          <List>
            <ListItem button component={NavLink}>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component={NavLink}>
              <ListItemText primary="Ayuda" />
            </ListItem>
            <ListItem button component={NavLink}>
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
          <div key={libro.title} className="libro-item">
            <img
              src={libro.coverUrl}
              alt={libro.title}
              className="libro-imagen"
            />
            <div className="libro-info">
              <h2 className="libro-titulo">{libro.title}</h2>
              <p className="libro-autor">Autor: {libro.authors}</p>
              <p className="libro-publicacion">
                Publicación: {libro.publishedDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AppBar
      position={scrolled ? "fixed" : "static"}
      color={scrolled ? "primary" : "transparent"}
      sx={{
        backgroundColor: scrolled ? "#5e8fda" : "#5d9a9e",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Tienda
        </Typography>
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
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
      {renderResultados()}
    </AppBar>
  );
};

export default Navegacion;
