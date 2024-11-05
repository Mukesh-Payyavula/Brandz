import React from 'react';
import './ScrollingBanner.css';

const ScrollingBanner = () => {
  const messages = [
    'Huge Sale! Up to 50% off on selected items!',
    'Free shipping on orders over ₹ 5,000',
    'New arrivals just in! Check them out!',
    'Best products at lowest price',
  ];

  return (
    <div className="scrolling-banner">
      <div className="scrolling-text">
        {messages.map((msg, index) => (
          <span key={index} className="banner-message">{msg}</span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
