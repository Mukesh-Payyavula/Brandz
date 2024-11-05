// src/components/Reviews.js

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './Reviews.css';

const reviews = [
  {
    id: 1,
    name: 'Mukesh Payyavula',
    review: 'Great place to shop latest products!',
    rating: 5,
    image: '/images/IMG_8115.JPG',
  },
  {
    id: 2,
    name: 'Venkatesh Chithaluri',
    review: 'It was okay, but I expected more features.',
    rating: 3,
    image: '',
  },
  {
    id: 3,
    name: 'Adithya Santhoju',
    review: 'Amazing experience! Highly recommend.',
    rating: 4,
    image: '/images/Adithya.jfif',
  },
  
];

const starRating = (rating) => {
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? 'text-warning' : 'text-muted'}>
      ★
    </span>
  ));
};

const Reviews = () => {
  return (
    <div className="reviews-section">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <Row>
        {reviews.map((review) => (
          <Col key={review.id} md={4} className="mb-4">
            <Card className="review-card" style={{ backgroundColor: '#f0f8ff' }}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img src={review.image} alt={review.name} className="review-image" />
                  <div className="ml-3">
                    <Card.Title className="review-name">{review.name}</Card.Title>
                    <div className="review-rating">{starRating(review.rating)}</div>
                  </div>
                </div>
                <Card.Text className="review-text">{review.review}</Card.Text>
                {/* <Card.Footer>
                  <small className="text-muted">Rating: {review.rating} stars</small>
                </Card.Footer> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reviews;
