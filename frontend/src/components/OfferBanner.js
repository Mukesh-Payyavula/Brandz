import React from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

const OfferBanner = ({ title, description, buttonText, onButtonClick }) => {
  return (
    <Alert variant="info" className="text-center">
      <Alert.Heading>{title}</Alert.Heading>
      <p>{description}</p>
      <Button variant="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </Alert>
  );
};

const Banner = () => {
  const handleButtonClick = () => {
    alert('Offer claimed!');
  };

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <OfferBanner
            title="Special Offer!"
            description="Get 50% off on your first purchase."
            buttonText="Claim Offer"
            onButtonClick={handleButtonClick}
          />
        </Col>
        <Col>
          <OfferBanner
            title="Limited Time Discount!"
            description="Use code 'SALE2024' for a 20% discount."
            buttonText="Shop Now"
            onButtonClick={handleButtonClick}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
