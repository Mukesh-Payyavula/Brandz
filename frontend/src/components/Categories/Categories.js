import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'

const categories = [
  { id: 'Men', name: 'Men', imgSrc: '/images/Men.jpg' },
  { id: 'Women', name: 'Women', imgSrc: '/images/Woman.jpg' },
  { id: 'Kids', name: 'Kids', imgSrc: '/images/Kids.jpg' },
  { id: 'Fashion', name: 'Fashion', imgSrc: '/images/Fashion.jpg' },
];

const Categories = () => {
  return (
    <Row className="mb-4">
      {categories.map((category) => (
        <Col  key={category.id} className="mb-3">
          <Link to={`/category/${category.id}`}>
            <Card className="category-card text-center">
              <Card.Img sm={12} md={6} lg={4} xl={3} 
                variant="top" 
                src={category.imgSrc} 
                className="card-img-top "
              />
              <Card.Body className="card-body">
                <Card.Title className="card-title">{category.name}</Card.Title>
                <Link to={`/category/${category.id}`}>
                  <Button className='button'>Explore Now</Button>
                </Link>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default Categories;
