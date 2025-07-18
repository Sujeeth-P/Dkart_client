import React, { useState, useEffect } from 'react';
import {
    Container, Row, Col, Card, Badge, Form, InputGroup,
    Alert, Spinner
} from 'react-bootstrap';
import {
    FaSearch, FaShoppingCart, FaCheck, FaBox
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { productAPI } from '../utils/api';
import '../Components/css/Product.css';
import '../Components/css/CartButton.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [animatingCartProductId, setAnimatingCartProductId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productAPI.getProducts();
                if (response.success) {
                    setProducts(response.products);
                    setFilteredProducts(response.products);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('Error loading products: ' + (err.message || 'Unknown error'));
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('userToken');
            const userData = localStorage.getItem('userData');
            setIsAuthenticated(token && userData);
        };

        checkAuth();
        const handleAuthChange = () => checkAuth();
        window.addEventListener('authChange', handleAuthChange);
        window.addEventListener('storage', handleAuthChange);
        return () => {
            window.removeEventListener('authChange', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    useEffect(() => {
        let filtered = [...products];
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'rating': return (b.rating?.average || 0) - (a.rating?.average || 0);
                case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
                default: return a.name.localeCompare(b.name);
            }
        });

        setFilteredProducts(filtered);
    }, [products, searchTerm, selectedCategory, sortBy]);

    const categories = [...new Set(products.map(product => product.category))];

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            setShowLoginAlert(true);
            setTimeout(() => setShowLoginAlert(false), 3000);
            return;
        }

        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock
        });

        setAnimatingCartProductId(product._id);

        setTimeout(() => {
            setAnimatingCartProductId(null);
        }, 1500);
    };

    if (loading) {
        return (
            <Container className="py-4 text-center">
                <Spinner animation="border" role="status" variant="primary" />
                <p className="mt-2">Loading products...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {showLoginAlert && (
                <Alert variant="warning" className="mb-3">
                    <FaShoppingCart className="me-2" />
                    Please login to add items to your cart!
                </Alert>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h2 mb-0">Our Products</h1>
                <Badge bg="secondary" className="fs-6">{filteredProducts.length} Products</Badge>
            </div>

            <Row className="mb-4">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Sort by Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                        <option value="newest">Newest First</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {filteredProducts.length === 0 ? (
                    <Col className="text-center py-5">
                        <FaBox size={64} className="text-muted mb-3" />
                        <h3>No products found</h3>
                        <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </Col>
                ) : (
                    filteredProducts.map(product => (
                        <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="product-card h-100">
                                <div className="product-image-container">
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        alt={product.name}
                                        className="product-image"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    <Badge bg="light" text="dark" className="mb-2">
                                        {product.category}
                                    </Badge>

                                    <Card.Title className="product-title">
                                        {product.name}
                                    </Card.Title>

                                    <Card.Text className="product-description" title={product.description}>
                                        {product.description}
                                    </Card.Text>

                                    <div className="product-info-section">
                                        {/* <div className="d-flex align-items-center mb-1">
                                            <div className="text-warning me-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={i < (product.rating?.average || 0) ? 'text-warning' : 'text-muted'}
                                                    />
                                                ))}
                                            </div>
                                            <small className="text-muted">
                                                ({product.rating?.count || 0} reviews)
                                            </small>
                                        </div> */}

                                        <div>
                                            <h5 className="mt-3 text-primary">${product.price}</h5>
                                            {product.stock > 0 && (
                                                <small className="text-success">
                                                    <FaCheck className="me-1" />
                                                    In Stock ({product.stock})
                                                </small>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <button
                                            className={`cart-button w-100 ${animatingCartProductId === product._id ? "clicked" : ""}`}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0 || animatingCartProductId === product._id}
                                            title={!isAuthenticated ? "Login required to add to cart" : "Add to cart"}
                                            style={{
                                                opacity: !isAuthenticated ? 0.7 : 1,
                                                cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <span className="add-to-cart">
                                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                            </span>
                                            <span className="added">Added</span>
                                            <FaShoppingCart className="fa-shopping-cart" />
                                            <FaBox className="fa-box" />
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default Product;
