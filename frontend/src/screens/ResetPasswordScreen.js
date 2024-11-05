// src/screens/ResetPasswordScreen.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();  // Get the token from the URL

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Make the API request to reset the password
      const response = await axios.post(
        `/api/users/reset-password/${token}`,
        { password }
      );

      setMessage(response.data.message); // Success message
      setLoading(false);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred, please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Meta title="Reset Password | Brandz" />
      <FormContainer>
        <h2>Reset Password</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleResetPasswordSubmit}>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="primary" disabled={loading}>
            {loading ? "Loading..." : "Reset Password"}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ResetPasswordScreen;
