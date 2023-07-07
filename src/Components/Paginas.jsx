import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({ currentPage, setCurrentPage }) => {
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav aria-label="Page navigation example" style={{ margin: "40px" }}>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" onClick={() => handlePageClick(currentPage - 1)}  style={{ cursor: "pointer" }}>
            Anterior
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <a className="page-link" onClick={() => handlePageClick(1)}  style={{ cursor: "pointer" }}>
            1
          </a>
        </li>
        <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
          <a className="page-link" onClick={() => handlePageClick(2)}  style={{ cursor: "pointer" }}>
            2
          </a>
        </li>
        <li className={`page-item ${currentPage === 3 ? "active" : ""}`}>
          <a className="page-link" onClick={() => handlePageClick(3)}  style={{ cursor: "pointer" }}>
            3
          </a>
        </li>
        <li className={`page-item ${currentPage === 4 ? "active" : ""}`}>
          <a className="page-link" onClick={() => handlePageClick(4)}  style={{ cursor: "pointer" }}>
            4
          </a>
        </li>
        <li className={`page-item ${currentPage === 5 ? "active" : ""}`}>
          <a className="page-link" onClick={() => handlePageClick(5)}
           style={{ cursor: "pointer" }}>
            5
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" onClick={() => handlePageClick(currentPage + 1)}
           style={{ cursor: "pointer" }}>
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
