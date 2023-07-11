import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBook, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./BookList.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Paginas";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const categories = ["arte", "drama", "romance", "misterios", "deportes"];
  const googleBooksApiKey = "AIzaSyD5rr0qZbEjp0Mk6bLslDPP2xQQTQF3urc";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const limit = 4;
        const category = categories[currentPage - 1];
        const cacheKey = `books_${category}_${currentPage}`;
        let cachedData = localStorage.getItem(cacheKey);

        if (cachedData) {
          setBooks(JSON.parse(cachedData));
        } else {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${category}&maxResults=${limit}&key=${googleBooksApiKey}`
          );

          const booksData = response.data.items;
          const booksWithImages = booksData.map((bookData) => {
            const coverUrl = bookData.volumeInfo.imageLinks?.thumbnail || null;
            const price = (Math.random() * (30000 - 5000) + 5000).toFixed(2);
            const formattedPrice = `${price} COP`;

            return {
              key: bookData.id,
              title: bookData.volumeInfo.title,
              author_name: bookData.volumeInfo.authors,
              first_publish_year: bookData.volumeInfo.publishedDate,
              coverUrl,
              price,
              formattedPrice,
            };
          });

          localStorage.setItem(cacheKey, JSON.stringify(booksWithImages));
          setBooks(booksWithImages);
        }
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
      Object.values(cart).forEach((item) => {
        total += parseFloat(item.book.price) * item.quantity;
      });
      setTotalPrice(total.toFixed(2));
    };

    calculateTotalPrice();
  }, [cart, cartCount]);

  const generateRandomPrice = () => {
    const price = (Math.random() * (30000 - 5000) + 5000).toFixed(2);
    return {
      price,
      formattedPrice: `${price} COP`,
    };
  };

  const addToCart = (event, book) => {
    event.preventDefault();
    if (cart[book.key]) {
      const updatedCart = { ...cart };
      updatedCart[book.key].quantity += 1;
      setCart(updatedCart);
    } else {
      const updatedCart = {
        ...cart,
        [book.key]: { book, quantity: 1 },
      };
      setCart(updatedCart);
    }
    setCartCount(cartCount + 1);
    setBounce(true);
  };

  const removeBookFromCart = (itemToRemove) => {
    const updatedCart = { ...cart };
    delete updatedCart[itemToRemove.book.key];
    setCart(updatedCart);
    setCartCount(cartCount - itemToRemove.quantity);
  };

  const emptyCart = () => {
    setCart({});
    setCartCount(0);
  };

  const onAnimationEnd = () => {
    setBounce(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePaymentSuccess = () => {
    emptyCart();
    navigate("/");
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
                  Precio: {book.formattedPrice}
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
                  <Link
                    to={`/bookDetails/${book.key}`}
                    style={{ textDecoration: "none" }}
                  >
                    Ver Más Detalles
                  </Link>
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p>No hay libros disponibles.</p>
      )}

      {Object.keys(cart).length > 0 && (
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
            {Object.values(cart).map((item) => (
              <div className="cart-item" key={item.book.key}>
                <span></span>
                {item.book.title && <h6>{item.book.title}</h6>}
                {item.book.coverUrl ? (
                  <img src={item.book.coverUrl} alt={item.book.title} />
                ) : (
                  <p>No hay imagen disponible para este libro.</p>
                )}
                <div className="todo-carrito">
                  <span className="precio-carrito">
                    <p>Precio: {item.book.price} COP</p>
                  </span>

                  <span className="cantidad-libros">
                    <p>Cantidad: {item.quantity}</p>
                  </span>
                  <span className="papelera">
                    <button
                      className="remove-book-button"
                      onClick={() => removeBookFromCart(item)}
                    >
                      <FaTrashAlt size={20} />
                    </button>
                  </span>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p>Total: {totalPrice} COP</p>
              <button className="empty-cart-button" onClick={emptyCart}>
                Vaciar Carrito
              </button>
              <span>
                <button onClick={() => navigate("/pago")}>Ir a pagar</button>
              </span>
            </div>
          </div>
        </div>
      )}

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default BookList;
