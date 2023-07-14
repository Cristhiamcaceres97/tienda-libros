import React from "react";
import Carousel from "./CarouselComponent";
import BookList from "./BookList";
import PaymentMethods from "./PaymentMethods";
import ListComponent from "./ListComponent";
import Footer from "./Footer";

const Inicio = () => {
  return (
    <div>
      <Carousel />
      <BookList />
      <PaymentMethods />
      <ListComponent />
      <Footer />
    </div>
  );
};

export default Inicio;
