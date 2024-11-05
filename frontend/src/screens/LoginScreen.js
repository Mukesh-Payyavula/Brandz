import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { login } from "../redux/actions/userActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import axios from 'axios';

const LoginScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error: loginError } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [dispatch, navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(login(email, password));
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('/api/users/forgot-password', { email });
      setMessage(response.data.message || 'Check your email for the reset link.');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred, please try again.');
    }
  };

  return (
    <>
      <Meta title="Clothshop | Login" />
      <FormContainer>
        <h2>{isForgotPassword ? 'Forgot Password' : 'Sign In'}</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        {isForgotPassword ? (
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
                Remembered your password? <Link to="#" onClick={() => setIsForgotPassword(false)}>Sign In</Link>
              </Col>
            </Row>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            {loginError && <Message variant="danger">{loginError}</Message>}
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-3" type="submit" variant="primary">
              {loading ? <Loading /> : 'Sign In'}
            </Button>
            <Row className="py-3">
              <Col>
                New Customer? <Link to="/register">Register</Link>
              </Col>
              <Col className="text-right">
                <Link to="#" onClick={() => setIsForgotPassword(true)}>Forgot Password?</Link>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default LoginScreen;
