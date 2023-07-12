import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
    className="footer fixed-bottom bg-dark text-white"
      style={{ height: "4vh", width: "100%" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Paco's Book. Todos los derechos
              reservados.
            </p>
            <p className="text-center">
              Diseño página web y desarrollo por Vakum
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
