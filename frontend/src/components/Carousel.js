import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is here

const AutoCarousel = () => {
  const items = [
    { image: '/images/Banner-1.jpg', alt: 'First Slide', caption: 'Slide 1' },
    { image: 'https://img.freepik.com/free-vector/hand-drawn-texture-boutique-template_23-2149322048.jpg?t=st=1730441628~exp=1730445228~hmac=6bf8b3159ebaaf73ced3c0138700465051a60d19c88d4054c88584a240e4cbc5&w=826', alt: 'Second Slide', caption: 'Slide 2' },
    { image: '/images/image3.jpg', alt: 'Third Slide', caption: 'Slide 3' },
  ];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Auto slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [items.length]);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      {items.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.alt}
          />
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// Ensure you export the AutoCarousel component
export default AutoCarousel;

const App = () => (
  <div>
    <h1>React Bootstrap Carousel</h1>
    <AutoCarousel />
  </div>
);

// Render the App component
ReactDOM.render(<App />, document.getElementById('root'));
