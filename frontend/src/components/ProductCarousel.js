import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './ProductCarousel.css';

function UncontrolledExample() {
  return (
    <Carousel className="d-block w-100">
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100"
          src="/images/Banner1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100"
          src="/images/banner.avif"
          alt="Second slide"
        />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item className="carousel-item-height">
        <img
          className="d-block w-100"
          src="/images/Banner-1.jpg" // Replace with your image path
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
