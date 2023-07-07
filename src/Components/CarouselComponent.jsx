import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://fotografias-compromiso.atresmedia.com/clipping/cmsimages02/2023/02/15/92C7C8E9-6262-48D6-AF7B-95CDBB483331/portada-libro-secta-camilla-lackberg-henrik-fexeus_58.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Paco's Book</h5>
          <p>Intriga y misterio se entrelazan en 'La secta' de Camilla Läckberg. </p>
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
