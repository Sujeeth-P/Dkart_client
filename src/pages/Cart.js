import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Components/css/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart();
    const [showPopover, setShowPopover] = useState(false);

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleOrderPlaced = () => {
        setShowPopover(true);
    };    const handleClosePopover = () => {
        setShowPopover(false);
        clearCart(); // Clear the cart after order is placed
    };

    if (cartItems.length === 0) {
        return (
            <Container className="cart-page py-5">
                <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                        <div className="empty-cart">
                            <FaShoppingCart size={100} className="text-muted mb-4" />
                            <h2>Your Cart is Empty</h2>
                            <p className="text-muted mb-4">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link to="/products">
                                <Button variant="primary" size="lg">
                                    <FaArrowLeft className="me-2" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="cart-page py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">
                        <FaShoppingCart className="me-3" />
                        Shopping Cart
                    </h1>
                    <p className="text-muted">
                        You have {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart
                    </p>
                </Col>
            </Row>

            <Row>
                <Col lg={8}>
                    <Card className="cart-items-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Cart Items</h5>
                            <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={clearCart}
                            >
                                Clear All
                            </Button>
                        </Card.Header>
                        <Card.Body className="p-0">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`cart-item p-3 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="cart-item-image"
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <h6 className="item-name">{item.name}</h6>
                                            <div className="item-price">
                                                <span className="current-price fw-bold">
                                                    {formatPrice(item.price)}
                                                </span>
                                                {item.originalPrice > item.price && (
                                                    <span className="original-price text-muted text-decoration-line-through ms-2">
                                                        {formatPrice(item.originalPrice)}
                                                    </span>
                                                )}
                                            </div>
                                            {item.discount > 0 && (
                                                <Badge bg="success" className="mt-1">
                                                    {item.discount}% OFF
                                                </Badge>
                                            )}
                                        </Col>
                                        <Col md={3}>
                                            <div className="quantity-controls d-flex align-items-center">
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                >
                                                    <FaMinus />
                                                </Button>
                                                <span className="quantity-display mx-3 fw-bold">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                >
                                                    <FaPlus />
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <div className="item-total text-end">
                                                <div className="fw-bold">
                                                    {formatPrice(item.price * item.quantity)}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={1} className="text-end">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>

                    <div className="mt-3">
                        <Link to="/products">
                            <Button variant="outline-primary">
                                <FaArrowLeft className="me-2" />
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Col>

                <Col lg={4}>
                    <Card className="cart-summary-card">
                        <Card.Header>
                            <h5 className="mb-0">Order Summary</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="summary-row d-flex justify-content-between mb-2">
                                <span>Subtotal ({getCartItemsCount()} items):</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className="summary-row d-flex justify-content-between mb-2">
                                <span>Shipping:</span>
                                <span className="text-success">
                                    {getCartTotal() >= 499 ? 'FREE' : formatPrice(49)}
                                </span>
                            </div>
                            <div className="summary-row d-flex justify-content-between mb-2">
                                <span>Tax (18% GST):</span>
                                <span>{formatPrice(getCartTotal() * 0.18)}</span>
                            </div>
                            <hr />
                            <div className="summary-total d-flex justify-content-between mb-3">
                                <strong>Total:</strong>
                                <strong className="text-primary">
                                    {formatPrice(
                                        getCartTotal() + 
                                        (getCartTotal() >= 499 ? 0 : 49) + 
                                        (getCartTotal() * 0.18)
                                    )}
                                </strong>
                            </div>
                            
                            {getCartTotal() < 499 && (
                                <Alert variant="info" className="small">
                                    Add items worth {formatPrice(499 - getCartTotal())} more for FREE shipping!
                                </Alert>
                            )}

                            <Button variant="success" size="lg" className="w-100 mb-2" onClick={handleOrderPlaced}>
                                <FaCreditCard className="me-2" />
                                Proceed to Checkout
                            </Button>

                            <div className="payment-options text-center">
                                <small className="text-muted">
                                    Secure checkout with multiple payment options
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Popover Overlay */}
            {showPopover && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '16px',
                        padding: '40px',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                        backdropFilter: 'blur(10px)',
                        textAlign: 'center',
                        color: '#000',
                        maxWidth: '90%',
                    }}>
                        <div className="tick-animation mb-3">
                            <svg width="80" height="80" viewBox="0 0 52 52">
                                <circle cx="26" cy="26" r="25" fill="none" stroke="#4BB543" strokeWidth="2" />
                                <path fill="none" stroke="#4BB543" strokeWidth="5" d="M14 27 l7 7 l17 -17" />
                            </svg>
                        </div>
                        <h3 className="mt-3">Your order has been placed!</h3>
                        <Button variant="primary" className="mt-4" onClick={handleClosePopover}>
                            Done
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Cart;
