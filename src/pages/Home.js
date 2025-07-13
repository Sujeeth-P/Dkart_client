import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Carousel, Button, Badge, Alert } from 'react-bootstrap';
import { FaStar,FaArrowRight,FaFire,FaShippingFast,FaShieldAlt,FaHeadset,FaShoppingCart, FaCheck, FaBox } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Components/css/Home.css';

const Home = () => {
    const [addedToCart, setAddedToCart] = useState(null);
    const { addToCart } = useCart();
    const [animatingCartProductId, setAnimatingCartProductId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const navigate = useNavigate();

    // Check authentication status
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const userData = localStorage.getItem('userData');
            setIsAuthenticated(token && userData);
        };

        checkAuth();
        
        // Listen for auth changes
        const handleAuthChange = () => {
            checkAuth();
        };
        
        window.addEventListener('authChange', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);
        
        return () => {
            window.removeEventListener('authChange', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);


    const featuredProducts = [
        {
            id: 1,
            name: "iPhone 14 Pro",
            price: 109999,
            originalPrice: 129999,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop&auto=format",
            rating: 4.8,
            discount: 15
        },
        {
            id: 2,
            name: "MacBook Air M2",
            price: 114999,
            originalPrice: 134999,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format",
            rating: 4.7,
            discount: 15
        },
        {
            id: 3,
            name: "Sony WH-1000XM5",
            price: 29999,
            originalPrice: 39999,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format",
            rating: 4.6,
            discount: 25
        },
        {
            id: 4,
            name: "Apple Watch Ultra",
            price: 79999,
            originalPrice: 89999,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format",
            rating: 4.8,
            discount: 11
        }
    ];

    const handleAddToCart = (product) => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            setShowLoginAlert(true);
            setTimeout(() => {
                setShowLoginAlert(false);
                navigate('/login', { state: { from: { pathname: '/home' } } });
            }, 2000);
            return;
        }

        // Proceed with adding to cart if authenticated
        addToCart(product);
        setAddedToCart(product.id);
        setAnimatingCartProductId(product.id);

        setTimeout(() => {
            setAddedToCart(null);
        }, 2000);

        setTimeout(() => {
            setAnimatingCartProductId(null);
        }, 1500);
    };

    return (
        <>
            {/* Success Alert */}
            {addedToCart && (
                <Alert variant="success" className="mb-4 mx-3 d-flex align-items-center">
                    <FaCheck className="me-2" />
                    Product added to cart successfully!
                </Alert>
            )}

            {/* Login Required Alert */}
            {showLoginAlert && (
                <Alert variant="warning" className="mb-4 mx-3 d-flex align-items-center">
                    <FaShoppingCart className="me-2" />
                    Please login to add items to cart. Redirecting...
                </Alert>
            )}

            {/* Hero Carousel Section */}
            <Carousel className="hero-carousel" controls={true} indicators={true}>
                <Carousel.Item>
                    <div className="carousel-slide carousel-slide-1">
                        <Container>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <div className="hero-content">
                                        <h1 className="hero-title">Big Billion Days</h1>
                                        <p className="hero-subtitle">Unbelievable Deals & Offers</p>
                                        <Button variant="warning" size="lg" className="hero-btn" as={Link} to="/products">
                                            Shop Now
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="hero-image">
                                        <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop&auto=format" alt="Electronics" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-slide carousel-slide-2">
                        <Container>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <div className="hero-content">
                                        <h1 className="hero-title">Fashion Sale</h1>
                                        <p className="hero-subtitle">Up to 80% Off on Fashion</p>
                                        <Button variant="danger" size="lg" className="hero-btn" as={Link} to="/products">
                                            Explore Fashion
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="hero-image">
                                        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop&auto=format" alt="Fashion" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="carousel-slide carousel-slide-3">
                        <Container>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <div className="hero-content">
                                        <h1 className="hero-title">Home & Kitchen</h1>
                                        <p className="hero-subtitle">Transform Your Home</p>
                                        <Button variant="success" size="lg" className="hero-btn" as={Link} to="/products">
                                            Shop Home
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="hero-image">
                                        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop&auto=format" alt="Home & Kitchen" />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Carousel.Item>
            </Carousel>

            {/* Categories Section */}
            <Container className="my-5">
                <Row className="mb-4">
                    <Col>
                        <h2 className="section-title text-center">Shop by Category</h2>
                    </Col>
                </Row>
                <Row className="category-row">
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">📱</div>
                                <Card.Title>Electronics</Card.Title>
                                <Card.Text>Up to 60% Off</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">👗</div>
                                <Card.Title>Fashion</Card.Title>
                                <Card.Text>Min 40% Off</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">🏠</div>
                                <Card.Title>Home</Card.Title>
                                <Card.Text>From ₹199</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">🎮</div>
                                <Card.Title>Gaming</Card.Title>
                                <Card.Text>Best Deals</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">⚽</div>
                                <Card.Title>Sports</Card.Title>
                                <Card.Text>From ₹299</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="category-col">
                        <Card className="category-card">
                            <Card.Body className="text-center">
                                <div className="category-icon">📚</div>
                                <Card.Title>Books</Card.Title>
                                <Card.Text>Up to 50% Off</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Featured Products Section */}
            <Container className="my-5">
                <Row className="mb-4">
                    <Col className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="section-title">Featured Products</h2>
                            <p className="section-subtitle">Handpicked deals just for you</p>
                        </div>
                        <Button variant="outline-primary" as={Link} to="/products">
                            View All <FaArrowRight className="ms-2" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {featuredProducts.map(product => (
                        <Col lg={3} md={6} sm={6} key={product.id} className="mb-4">
                            <Card className="product-card h-100">
                                <div className="product-image-container">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <Badge bg="danger" className="discount-badge">
                                        {product.discount}% OFF
                                    </Badge>
                                    <div className="product-overlay">
                                        <FaFire className="trending-icon" />
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="product-title">{product.name}</Card.Title>
                                    <div className="price-section mb-2">
                                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                                        <span className="original-price ms-2">₹{product.originalPrice.toLocaleString()}</span>
                                    </div>                                    <div className="rating-section mb-3">
                                        <FaStar className="star-icon" />
                                        <span>{product.rating}</span>
                                    </div>
                                    <button
                                        className={`cart-button w-100 ${animatingCartProductId === product.id ? "clicked" : ""}`}
                                        onClick={() => handleAddToCart(product)}
                                        disabled={animatingCartProductId === product.id}
                                        title={!isAuthenticated ? "Login required to add to cart" : "Add to cart"}
                                        style={{
                                            opacity: !isAuthenticated ? 0.7 : 1,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span className="add-to-cart">Add to Cart</span>
                                        <span className="added">Added</span>
                                        <FaShoppingCart className="fa-shopping-cart" />
                                        <FaBox className="fa-box" />
                                    </button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Top Brands Section */}
            <Container className="my-5">
                <Row>
                    <Col className='mb-4'>
                        <h2 className="section-title text-center">Top Brands</h2>
                        <p className="section-subtitle text-center">Shop from your favorite brands</p>
                    </Col>
                </Row>
                <Row className="brand-showcase d-flex justify-content-evenly">
                    <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="brand-logo" />
                        </div>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" alt="Samsung" className="brand-logo" />
                        </div>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Nike" className="brand-logo" />
                        </div>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Adidas" className="brand-logo" />
                        </div>
                    </Col>
                    {/* <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://www.sony.com/en/template/2023/img/logo.svg" alt="Sony" className="brand-logo" />
                        </div>
                    </Col>
                    <Col md={2} sm={4} xs={6} className="brand-col">
                        <div className="brand-card">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/LG_logo_%282015%29.svg" alt="LG" className="brand-logo" />
                        </div>
                    </Col> */}
                </Row>
            </Container>

            {/* Special Offers Banner */}
            <Container className="my-5">
                <div className="special-offers-banner">
                    <Row className="align-items-center text-center">
                        <Col>
                            <h3 className="offer-title">🎉 Weekend Special Sale! 🎉</h3>
                            <p className="offer-subtitle">Get up to 70% off on selected items</p>
                            <Button variant="warning" size="lg" className="mt-3" as={Link} to="/products">
                                Shop Now
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>

            {/* Features Section */}
            <Container className="my-5">
                <Row className="features-section">
                    <Col md={3} sm={6} className="feature-col text-center">
                        <div className="feature-item">
                            <FaShippingFast className="feature-icon" />
                            <h5>Free Delivery</h5>
                            <p>On orders above ₹499</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="feature-col text-center">
                        <div className="feature-item">
                            <FaShieldAlt className="feature-icon" />
                            <h5>Secure Payment</h5>
                            <p>100% secure payment</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="feature-col text-center">
                        <div className="feature-item">
                            <FaHeadset className="feature-icon" />
                            <h5>24/7 Support</h5>
                            <p>Dedicated support</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="feature-col text-center">
                        <div className="feature-item">
                            <FaStar className="feature-icon" />
                            <h5>Best Quality</h5>
                            <p>Premium products only</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;