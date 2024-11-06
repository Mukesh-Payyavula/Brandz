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
  const [otpSentMessage, setOtpSentMessage] = useState(""); // State for OTP sent message
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const otpVerification = useSelector((state) => state.otpVerification);
  const { loading: otpLoading, error: otpError, success } = otpVerification;

  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to home page after registration success
    }
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (success) {
      setOtpVerified(true); // Set OTP verified to true
      navigate("/"); // Redirect to login page after OTP verification success
    }
  }, [navigate, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && confirmPassword === password) {
      dispatch(register(name, email, password)); // Register the user
      setShowOtpInput(true); // Show OTP input after registration
      setOtpSentMessage("OTP has been sent to your email. Please enter it below to verify your account.");
    } else {
      setErr("Passwords do not match");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    
    // Check if userInfo is available before trying to access its properties
    if (userInfo && userInfo._id) {
      dispatch(verifyOtp({ userId: userInfo._id, otp })); // Call verifyOtp action
    } else {
      console.error("User info is missing, can't verify OTP");
      // You can display an error message here, or navigate as a fallback
      navigate("/"); // Navigate to the homepage even if userInfo is missing
    }
  
    // Navigate to homepage immediately after clicking the verify button, regardless of OTP verification result
    navigate("/login"); // Redirect to the homepage immediately
  };
  
  

  const isSubmitDisabled = !otpVerified || loading || otpLoading;

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
          <Button className="mt-3" type="submit" variant="primary" disabled={otpVerified || loading}>
            {loading ? <Loading /> : `Sign Up`}
          </Button>
        </Form>

        {/* OTP Sent Message */}
        {otpSentMessage && <Message variant="info">{otpSentMessage}</Message>}

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
            <Button type="submit" variant="success" className="mt-2" disabled={otpVerified || otpLoading}>
              {otpLoading ? <Loading /> : "Verify OTP"}
            </Button>
            {otpError && <Message variant="danger">{otpError}</Message>}
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
