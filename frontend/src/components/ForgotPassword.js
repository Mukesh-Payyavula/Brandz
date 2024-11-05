import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); 
        setError(''); 

        try {
            const response = await axios.post('/api/users/forgot-password', { email });
            // Assuming the server response has a message field
            setMessage(response.data.message || 'Check your email for the reset link.');
        } catch (err) {
            // Handle error response
            const errorMessage = err.response?.data?.message || 'An error occurred, please try again.';
            setError(errorMessage);
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Request Reset
                </Button>
            </Form>
        </div>
    );
};

export default ForgotPassword;
