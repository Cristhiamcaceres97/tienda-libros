import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loading, Grid } from "@nextui-org/react";
import Footer from "./Footer";
import "./BookDetails.css";

const BooksDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const bookData = response.data;
        const bookDetails = {
          title: bookData.volumeInfo.title,
          authors: bookData.volumeInfo.authors,
          publishedDate: bookData.volumeInfo.publishedDate,
          description: bookData.volumeInfo.description,
          pageCount: bookData.volumeInfo.pageCount,
          image: bookData.volumeInfo.imageLinks?.thumbnail,
          category: bookData.volumeInfo.categories?.join(", "),
          language: bookData.volumeInfo.language,
          format: bookData.volumeInfo.format,
          dimensions: bookData.volumeInfo.dimensions,
          isbn: bookData.volumeInfo.industryIdentifiers?.[0]?.identifier,
        };
        setBookDetails(bookDetails);
      } catch (error) {
        console.error("Error al obtener los detalles del libro:", error);
        setError(true);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (error) {
    return <p>Libro no encontrado. ERROR</p>;
  }

  if (!bookDetails) {
    return (
      <p>
        <Grid.Container gap={2}>
          <Grid>
            <Loading color="primary">Cargando...</Loading>
          </Grid>
        </Grid.Container>
      </p>
    );
  }

  return (
    <div className="todo-detalles">
      <h2>
        <b>{bookDetails.title}</b>
      </h2>
      <span>
        <img src={bookDetails.image} alt={bookDetails.title} />
      </span>
      <div className="parrafos">
        <span>
          <i>Autor:</i> {bookDetails.authors?.join(", ")}
        </span>
        <span>
          <i>Año de publicación: </i> {bookDetails.publishedDate}
        </span>
        <span>
          <i>Número de páginas: </i> {bookDetails.pageCount}
        </span>
        <span>
          <i>Categoria: </i> {bookDetails.category}
        </span>
        <span>
          <i>Lenguaje: </i> {bookDetails.language}
        </span>
        <span>
          <i>Formato: </i> {bookDetails.format}
        </span>
        <span>
          <i>Dimensiones: </i> {bookDetails.dimensions}
        </span>
        <span>
          <i>ISBN: </i> {bookDetails.isbn}
        </span>
      </div>
      <div className="sinopsis">
        <i>Sinopsis: </i> {bookDetails.description}
      </div>
      <div className="footer-opcional">
        <Footer />
      </div>
    </div>
  );
};

export default BooksDetails;
