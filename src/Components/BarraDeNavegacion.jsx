import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import "@mui/material/styles";

const Navegacion = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > window.innerHeight * 0.1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      position={trigger || scrolled ? "fixed" : "static"}
      color={trigger || scrolled ? "primary" : "transparent"}
      sx={{
        backgroundColor: scrolled ? "#1976d2" : "#5d9a9e",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Paco's Book
        </Typography>
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          exact
          activeClassName="active-link"
        >
          Inicio
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/about"
          activeClassName="active-link"
        >
          Ayuda
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/contact"
          activeClassName="active-link"
        >
          Contacto
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navegacion;
