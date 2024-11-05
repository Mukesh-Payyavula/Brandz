import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { register, verifyOtp } from "../redux/actions/userActions"; // Import verifyOtp action

const RegisterScreen = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP
  const [showOtpInput, setShowOtpInput] = useState(false); // Control OTP input visibility
  const [err, setErr] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword === password) {
      dispatch(register(name, email, password)); // Register the user
      setShowOtpInput(true); // Show OTP input after registration
    } else {
      setErr("Password do not match");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ userId: userInfo._id, otp })); // Call verifyOtp action
  };

  return (
    <>
      <Meta title="Clothshop | Register" />
      <FormContainer>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          {error && <Message variant="danger">{error}</Message>}
          {err && <Message variant="danger">{err}</Message>}
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="mt-3" type="submit" variant="primary">
            {loading ? <Loading /> : `Sign Up`}
          </Button>
        </Form>
        
        {/* OTP Input Form */}
        {showOtpInput && (
          <Form onSubmit={handleVerifyOtp} className="mt-3">
            <Form.Group controlId="otp">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="success" className="mt-2">
              Verify OTP
            </Button>
          </Form>
        )}

        <Row className="py-3">
          <Col>
            Have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
