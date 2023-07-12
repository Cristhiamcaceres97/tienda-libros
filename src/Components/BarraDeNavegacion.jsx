import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "@mui/material/styles";

const Navegacion = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const renderDesktopMenu = () => {
    return (
      <>
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
            <ListItem button component={NavLink} to="/" exact>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component={NavLink} to="/about">
              <ListItemText primary="Ayuda" />
            </ListItem>
            <ListItem button component={NavLink} to="/contact">
              <ListItemText primary="Contacto" />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  };

  return (
    <AppBar
      position={trigger || scrolled ? "fixed" : "static"}
      color={trigger || scrolled ? "primary" : "transparent"}
      sx={{
        backgroundColor: scrolled ? "#5e8fda" : "#5d9a9e",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Paco's Book
        </Typography>
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Toolbar>
    </AppBar>
  );
};

export default Navegacion;
