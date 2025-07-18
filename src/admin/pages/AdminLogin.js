import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const { login, isLoading, error, clearError } = useAdmin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    const result = await login(credentials);
    
    if (result.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">D-Kart Admin</h2>
                  <p className="text-muted">Sign in to your admin account</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      required
                      placeholder="Enter username or email"
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid username or email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter password"
                        disabled={isLoading}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="mt-4 text-center">
                  <small className="text-muted">
                    © 2024 D-Kart Admin Panel. All rights reserved.
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLogin;
