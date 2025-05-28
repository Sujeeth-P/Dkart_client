import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './css/Nave.css';

const Nave = () => {
    const { getCartItemsCount } = useCart();
    const cartItemsCount = getCartItemsCount();

    return (
        <NavbarBS bg="primary" variant="dark" expand="lg" className="navbar" style={{ backgroundColor: '#2874f0' }}>
            <Container>
                <NavbarBS.Brand as={Link} to="/" className="navbar-brand">
                    <span style={{ color: '#ffd700' }}>D</span>-Kart
                </NavbarBS.Brand>
                <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBS.Collapse id="basic-navbar-nav">                    <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/home" className="nav-link">Home</Nav.Link>
                    <Nav.Link as={Link} to="/products" className="nav-link">Products</Nav.Link>
                    <Nav.Link as={Link} to="/cart" className="nav-link position-relative">
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

                </Nav>
                </NavbarBS.Collapse>
            </Container>
        </NavbarBS>
    );
};

export default Nave;