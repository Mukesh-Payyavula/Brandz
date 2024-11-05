import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'navy', color: 'white' }}>
      <Container>
        <Row className="py-4">
          <Col md={4} className="text-center">
            <h5>About Us</h5>
            <p>Your go-to place for the latest in fashion. Shop with us for quality clothing at affordable prices.</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="#home" className="text-white">Home</Nav.Link>
              <Nav.Link href="#shop" className="text-white">Shop</Nav.Link>
              <Nav.Link href="#about" className="text-white">About</Nav.Link>
              <Nav.Link href="#contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" className="text-white mx-2"><FaFacebookF /></a>
              <a href="https://instagram.com" className="text-white mx-2"><FaInstagram /></a>
              <a href="https://twitter.com" className="text-white mx-2"><FaTwitter /></a>
              <a href="https://linkedin.com" className="text-white mx-2"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center py-3">&copy; {new Date().getFullYear()} BRANDZ. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
