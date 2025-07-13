import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './css/Nave.css';

const Nave = () => {
    const { getCartItemsCount } = useCart();
    const cartItemsCount = getCartItemsCount();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const storedUserData = localStorage.getItem('userData');
            
            if (token && storedUserData) {
                try {
                    const parsedUserData = JSON.parse(storedUserData);
                    setIsAuthenticated(true);
                    setUserData(parsedUserData);
                } catch (error) {
                    setIsAuthenticated(false);
                    setUserData(null);
                }
            } else {
                setIsAuthenticated(false);
                setUserData(null);
            }
        };

        checkAuth();
        
        // Listen for storage changes (when user logs in/out in another tab)
        const handleStorageChange = () => {
            checkAuth();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Custom event for when login/logout happens in the same tab
        window.addEventListener('authChange', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
        setShowLogoutModal(false);
        
        // Dispatch custom event for immediate UI update
        window.dispatchEvent(new Event('authChange'));
        
        navigate('/login');
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const handleCartClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            navigate('/login', { state: { from: { pathname: '/cart' } } });
        }
    };

    return (
        <NavbarBS bg="primary" variant="dark" expand="lg" className="navbar" style={{ backgroundColor: '#2874f0' }}>
            <Container>
                <NavbarBS.Brand as={Link} to="/" className="navbar-brand">
                    <span style={{ color: '#ffd700' }}>D</span>-Kart
                </NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBS.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/home" className="nav-link">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products" className="nav-link">Products</Nav.Link>
                        
                        {/* Cart Link - Always visible but with click handler for auth check */}
                        <Nav.Link 
                            as={Link} 
                            to="/cart" 
                            className="nav-link position-relative"
                            onClick={handleCartClick}
                        >
                            <FaShoppingCart className="me-1" />
                            Cart
                            {cartItemsCount > 0 && (
                                <Badge
                                    bg="danger"
                                    pill
                                    className="position-absolute top-0 start-100 translate-middle"
                                    style={{ fontSize: '0.7em' }}
                                >
                                    {cartItemsCount}
                                </Badge>
                            )}
                        </Nav.Link>

                        {/* Authentication Links */}
                        {isAuthenticated ? (
                            <NavDropdown 
                                title={
                                    <span className="d-flex align-items-center text-light">
                                        <FaUser className="me-2" />
                                        <span style={{ color: '#ffd700' }}>
                                            {userData?.name || 'User'}
                                        </span>
                                    </span>
                                } 
                                id="user-dropdown"
                                align="end"
                                className="user-dropdown no-arrow"
                            >
                                <NavDropdown.Item disabled className="text-muted">
                                    <small>Signed in as</small><br />
                                    <strong>{userData?.email || 'user@example.com'}</strong>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/cart">
                                    <FaShoppingCart className="me-2" />
                                    My Orders
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="nav-link">
                                <FaSignInAlt className="me-1" />
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </NavbarBS.Collapse>
            </Container>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={cancelLogout} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex align-items-center">
                        <FaSignOutAlt className="me-2" />
                        Confirm Logout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to logout?</p>
                    <small className="text-muted">
                        You'll need to login again to access your cart and place orders.
                    </small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={cancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmLogout}>
                        <FaSignOutAlt className="me-1" />
                        Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </NavbarBS>
    );
};

export default Nave;