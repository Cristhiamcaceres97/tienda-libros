import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBook, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookIds = [
          "9781955786225",
          "9781419728150",
          "9780613563338",
          "9781637386231",
          "9780810994553",
          "9781788622882",
          "9780930289362",
          "9780237535278",
          "9780553381689",
          "9783662598061",
          "9781417750429",
          "9788484702672",
          "9781401289256",
          "9781982115982",
          "9781779502773",
          "9780440412670",
          "9780425288856",
          "9789654487658",
        ];
        const promises = bookIds.map((bookId) =>
          axios.get(
            `https://openlibrary.org/api/books?bibkeys=${bookId}&format=json&jscmd=data`
          )
        );

        const responses = await Promise.all(promises);
        const booksData = responses.map((response) => {
          const responseData = response.data[Object.keys(response.data)[0]];
          return responseData ? responseData : null;
        });

        const validBooksData = booksData.filter(
          (bookData) => bookData !== null
        );

        const booksWithImages = await Promise.all(
          validBooksData.map(async (book) => {
            const isbn = book.isbn && book.isbn[0];

            if (!isbn) {
              return book;
            }

            try {
              const coverResponse = await axios.get(
                `https://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
              );

              const coverId =
                coverResponse.data &&
                coverResponse.data.items &&
                coverResponse.data.items[0] &&
                coverResponse.data.items[0].cover &&
                coverResponse.data.items[0].cover.id;

              if (coverId) {
                const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
                return {
                  ...book,
                  coverUrl,
                };
              }
            } catch (error) {
              console.error(
                `Error al obtener la imagen para el libro con ISBN ${isbn}:`,
                error
              );
            }

            return book;
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
  }, []);

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

  return (
    <div>
      <h2 className="cart-container">
        <button className="cart-button" onClick={() => setCartVisible(true)}>
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
        <ul className="book-list">
          {books.map((book) => (
            <li className="book-item" key={book.key}>
              {book.title && <h3>{book.title}</h3>}
              {book.coverUrl ? (
                <img src={book.coverUrl} alt={book.title} />
              ) : (
                <p>No hay imagen disponible para este libro.</p>
              )}
              {book.authors && (
                <p>
                  Autor: {book.authors.map((author) => author.name).join(", ")}
                </p>
              )}
              {book.languages && (
                <p>
                  Lenguaje:{" "}
                  {book.languages.map((language) => language.name).join(", ")}
                </p>
              )}
              <p className="precio-libros">
                Precio: <a href="#">{book.price}</a> <b>COP</b>
              </p>
              <a
                href="#"
                className="ov-btn-slide-top"
                onClick={(event) => addToCart(event, book)}
              >
                <FaShoppingCart size={20} /><b>Añadir al Carrito</b> 
              </a>
              <a href="#" className="ov-btn-slide-close">
                <FaBook size={20} />
               <b> Ver Más Detalles</b>
              </a>
            </li>
          ))}
        </ul>
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
    </div>
  );
};

export default BookList;
