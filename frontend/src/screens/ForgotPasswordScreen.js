import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/users/forgot-password", { email });
      setMessage(response.data.message || "Check your email for the reset link.");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred, please try again.");
    }
  };

  return (
    <>
      <Meta title="Forgot Password | Brandz" />
      <FormContainer>
        <h2>Forgot Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleForgotPasswordSubmit}>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="primary">
            Request Reset
          </Button>
          <Row className="py-3">
            <Col>
              Remembered your password? <Link to="/login">Sign In</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgotPasswordScreen;
