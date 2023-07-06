import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://www.mujeresqueleen.com/wp-content/uploads/2019/11/Orgullo-Resena-1200x675.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Paco's Book</h5>
          <p>Descubre el amor y los desafíos en Orgullo y Prejuicio.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://hips.hearstapps.com/hmg-prod/images/mejores-libros-1608147322.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Paco's Book</h5>
          <p>Sumérgete en el apasionante mundo de la literatura con nuestra colección de libros.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
