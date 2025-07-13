import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const AuthTest = () => {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check for stored user data
        const storedUserData = localStorage.getItem('userData');
        const storedToken = localStorage.getItem('userToken');
        
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const clearAuth = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
        setUserData(null);
        setToken(null);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <h3>Authentication Test Dashboard</h3>
                        </Card.Header>
                        <Card.Body>
                            {userData ? (
                                <Alert variant="success">
                                    <h5>✅ User Successfully Authenticated!</h5>
                                    <hr />
                                    <p><strong>Name:</strong> {userData.name}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                    <p><strong>User ID:</strong> {userData._id}</p>
                                    <p><strong>Token:</strong> {token ? '✅ Present' : '❌ Missing'}</p>
                                    <p><strong>Token Preview:</strong> {token ? `${token.substring(0, 20)}...` : 'N/A'}</p>
                                    <Button variant="warning" onClick={clearAuth}>
                                        Clear Authentication
                                    </Button>
                                </Alert>
                            ) : (
                                <Alert variant="info">
                                    <h5>ℹ️ No Authentication Data Found</h5>
                                    <p>Please login or signup to see your authentication data here.</p>
                                    <p>This component will automatically display your user data after successful authentication.</p>
                                </Alert>
                            )}
                            
                            <hr />
                            <div className="mt-4">
                                <h6>Test Instructions:</h6>
                                <ol>
                                    <li>Navigate to the signup page and create a new account</li>
                                    <li>After successful signup, login with your credentials</li>
                                    <li>Return to this page to see your authentication data</li>
                                    <li>Check browser console for detailed API responses</li>
                                </ol>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthTest;
