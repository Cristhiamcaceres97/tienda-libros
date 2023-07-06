import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Pagination = () => {
  return (
    <nav aria-label="Page navigation example" style={{ margin: '30px' }}>
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a className="page-link">Anterior</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
