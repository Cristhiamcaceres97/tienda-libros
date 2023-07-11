import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BooksDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

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
        };
        setBookDetails(bookDetails);
      } catch (error) {
        console.error("Error al obtener los detalles del libro:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    return <p>Cargando detalles del libro...</p>;
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <img src={bookDetails.image} alt={bookDetails.title} />
      <p>Autor: {bookDetails.authors?.join(", ")}</p>
      <p>Año de publicación: {bookDetails.publishedDate}</p>
      <p>Número de páginas: {bookDetails.pageCount}</p>
      <p>Sinopsis: {bookDetails.description}</p>
    </div>
  );
};

export default BooksDetails;
