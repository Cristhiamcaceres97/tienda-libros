import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const toggleCategoriesMenu = () => {
    setShowCategoriesMenu(!showCategoriesMenu);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://images.vexels.com/media/users/3/139752/isolated/preview/532e26143a0435e9c6ca7f436474389f-icono-de-libros.png"
          height="70px"
          width="100px"
          alt="logo"
        />
        <span>Paco's Book</span>
      </div>
      <ul className="nav-menu">
        <div className="menu-navbar">
          <li>
            <NavLink to="/" exact activeClassName="active-link">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/ayuda" activeClassName="active-link">
              Ayuda
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" activeClassName="active-link">
              Clientes
            </NavLink>
          </li>
          <li
            className={`categorias ${
              showCategoriesMenu ? "show" : ""
            } dropdown-container`}
          >
            <span className="nav-link" onClick={toggleCategoriesMenu}>
              Categorías{" "}
              {showCategoriesMenu ? (
                <i className="arrow up"></i>
              ) : (
                <i className="arrow down"></i>
              )}
            </span>
            <ul className={`dropdown-menu ${showCategoriesMenu ? "show" : ""}`}>
              <li>
                <Link activeClassName="active-link">
                  Científicos
                </Link>
              </li>
              <li>
                <Link activeClassName="active-link">
                  Literatura
                </Link>
              </li>
              <li>
                <Link  activeClassName="active-link">
                  De viaje
                </Link>
              </li>
              <li>
                <Link activeClassName="active-link">
                  Biografías
                </Link>
              </li>
              <li>
                <Link activeClassName="active-link">
                  Referencias
                </Link>
              </li>
              <li>
                <Link activeClassName="active-link">
                  Monografías
                </Link>
              </li>
              <li>
                <Link  activeClassName="active-link">
                  Drama misterio
                </Link>
              </li>
              <li>
                <Link  activeClassName="active-link">
                  Terror
                </Link>
              </li>
              <li>
                <Link  activeClassName="active-link">
                  Magia
                </Link>
              </li>
              <li>
                <Link  activeClassName="active-link">
                  Otros
                </Link>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
