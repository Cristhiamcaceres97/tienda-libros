import React from "react";
import Carousel from "./CarouselComponent";
import Buscador from "./Buscador";
import BookList from "./BookList";
import PaymentMethods from "./PaymentMethods";
import ListComponent from "./ListComponent";
import Footer from "./Footer";

const Inicio = () => {
  return (
    <div>
      <Carousel />
      <Buscador />
      <BookList />
      <PaymentMethods />
      <ListComponent />
      <Footer />
    </div>
  );
};

export default Inicio;
