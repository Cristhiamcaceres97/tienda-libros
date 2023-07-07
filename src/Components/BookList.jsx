import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBook, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import "./BookList.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Paginas";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const categories = ["anime", "drama", "romance", "misterios", "comedia"];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const limit = 4;
        const category = categories[currentPage - 1];
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${category}&limit=${limit}`
        );

        const booksData = response.data.docs;

        const booksWithImages = await Promise.all(
          booksData.map(async (bookData) => {
            const coverId = bookData.cover_i;

            if (coverId) {
              const coverResponse = await axios.get(
                `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
              );

              const coverUrl = coverResponse.data;

              return {
                ...bookData,
                coverUrl,
              };
            } else {
              return {
                ...bookData,
                coverUrl: null,
              };
            }
          })
        );

        const storedPrices = localStorage.getItem("prices");
        let prices = {};

        if (storedPrices) {
          prices = JSON.parse(storedPrices);
        } else {
          booksWithImages.forEach((book) => {
            prices[book.key] = generateRandomPrice();
          });

          localStorage.setItem("prices", JSON.stringify(prices));
        }

        const booksWithPrice = booksWithImages.map((book) => ({
          ...book,
          price: prices[book.key],
        }));

        setBooks(booksWithPrice);
      } catch (error) {
        console.error("Error al obtener la lista de libros:", error);
      }
    };

    fetchBooks();
  }, [currentPage, categories]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedCartCount = localStorage.getItem("cartCount");

    if (storedCart && storedCartCount) {
      setCart(JSON.parse(storedCart));
      setCartCount(parseInt(storedCartCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartCount", cartCount.toString());

    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach((book) => {
        total += book.price;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart, cartCount]);

  const generateRandomPrice = () => {
    return Math.floor(Math.random() * (30000 - 5000) + 5000);
  };

  const addToCart = (event, book) => {
    event.preventDefault();
    setCart([...cart, book]);
    setCartCount(cartCount + 1);
    setBounce(true);
  };

  const removeBookFromCart = (bookToRemove) => {
    const updatedCart = cart.filter((book) => book.key !== bookToRemove.key);
    setCart(updatedCart);
    setCartCount(cartCount - 1);
  };

  const emptyCart = () => {
    setCart([]);
    setCartCount(0);
  };

  const onAnimationEnd = () => {
    setBounce(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 className="cart-container">
        <button
          className="cart-button"
          onClick={() => setCartVisible(!cartVisible)}
          aria-label="Toggle Cart"
        >
          <FaShoppingCart
            className={`cart-icon ${bounce ? "bounce" : ""}`}
            onAnimationEnd={onAnimationEnd}
          />
          <span className={`cart-count ${bounce ? "bounce" : ""}`}>
            {cartCount}
          </span>
        </button>
      </h2>
      {books.length > 0 ? (
        <div className="book-list" style={{ margin: "30px" }}>
          {books.map((book) => (
            <Card key={book.key} className="book-item">
              {book.coverUrl ? (
                <Card.Img src={book.coverUrl} alt={book.title} />
              ) : (
                <div className="no-image">
                  <span>No hay imagen disponible para este libro.</span>
                </div>
              )}
              <Card.Body>
                {book.title && <Card.Title>{book.title}</Card.Title>}
                {book.author_name && (
                  <Card.Text>Autor: {book.author_name.join(", ")}</Card.Text>
                )}
                {book.first_publish_year && (
                  <Card.Text>
                    Año de Publicación: {book.first_publish_year}
                  </Card.Text>
                )}
                <Card.Text className="precio-libros">
                  Precio: <a href="#">{book.price}</a> COP
                </Card.Text>
                <Button
                  type="button"
                  className="btn btn-success"
                  style={{ margin: "0 5px 5px 40px" }}
                  onClick={(event) => addToCart(event, book)}
                >
                  <FaShoppingCart size={20} />
                  <b>Añadir al Carrito</b>
                </Button>
                <Button
                  type="button"
                  className="btn btn-dark"
                  style={{ margin: "0 0 0 40px" }}
                >
                  <FaBook size={20} />
                  <b>Ver Más Detalles</b>
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No hay libros disponibles.</p>
      )}

      {cart.length > 0 && (
        <div className={`cart-popup ${cartVisible ? "open" : ""}`}>
          <div className="cart-header">
            <h2>Carrito de Compras</h2>
            <button
              className="close-cart"
              onClick={() => setCartVisible(false)}
            >
              X
            </button>
          </div>
          <div className="cart-content">
            {cart.map((book) => (
              <div className="cart-item" key={book.key}>
                {book.title && <h3>{book.title}</h3>}
                {book.coverUrl ? (
                  <img src={book.coverUrl} alt={book.title} />
                ) : (
                  <p>No hay imagen disponible para este libro.</p>
                )}
                <p>Precio: {book.price} COP</p>
                <button
                  className="remove-book-button"
                  onClick={() => removeBookFromCart(book)}
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}
            <div className="cart-total">
              <p>Total: {totalPrice} COP</p>
              <button className="empty-cart-button" onClick={emptyCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      )}
      {<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default BookList;
