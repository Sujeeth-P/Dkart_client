import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup, Alert } from 'react-bootstrap';
import { FaStar, FaSearch, FaHeart, FaShoppingCart, FaCheck, FaBox } from 'react-icons/fa'; // Added FaBox
import { useCart } from '../context/CartContext';
import '../Components/css/Product.css'; // Assuming you have a CSS file for styling
import '../Components/css/CartButton.css'; // Import the new CSS for the button

const Product = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [addedToCart, setAddedToCart] = useState(null);
    const [animatingCartProductId, setAnimatingCartProductId] = useState(null); // State for animation

    const { addToCart } = useCart();

    // Local mock data for products
    const products = [
        {
            id: 1,
            name: "iPhone 14 Pro Max",
            category: "electronics",
            price: 129999,
            originalPrice: 149999,
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&auto=format",
            rating: 4.8,
            reviews: 2450,
            discount: 13,
            inStock: true
        },
        {
            id: 2,
            name: "MacBook Air M2",
            category: "electronics",
            price: 114999,
            originalPrice: 134999,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&auto=format",
            rating: 4.7,
            reviews: 1890,
            discount: 15,
            inStock: true
        },
        {
            id: 3,
            name: "Sony WH-1000XM5",
            category: "electronics",
            price: 29999,
            originalPrice: 39999,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format",
            rating: 4.6,
            reviews: 3220,
            discount: 25,
            inStock: true
        },
        {
            id: 4,
            name: "Apple Watch Ultra",
            category: "electronics",
            price: 79999,
            originalPrice: 89999,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format",
            rating: 4.8,
            reviews: 1567,
            discount: 11,
            inStock: true
        },
        {
            id: 5,
            name: "Nike Air Max 270",
            category: "fashion",
            price: 8499,
            originalPrice: 12999,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop&auto=format",
            rating: 4.5,
            reviews: 1245,
            discount: 35,
            inStock: true
        },
        {
            id: 6,
            name: "Adidas Ultraboost 22",
            category: "fashion",
            price: 16999,
            originalPrice: 19999,
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&auto=format",
            rating: 4.4,
            reviews: 987,
            discount: 15,
            inStock: true
        },
        {
            id: 7,
            name: "Samsung Galaxy S24 Ultra",
            category: "electronics",
            price: 119999,
            originalPrice: 139999,
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop&auto=format",
            rating: 4.7,
            reviews: 2100,
            discount: 14,
            inStock: true
        },
        {
            id: 8,
            name: "Canon EOS R6 Mark II",
            category: "electronics",
            price: 189999,
            originalPrice: 209999,
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&auto=format",
            rating: 4.6,
            reviews: 567,
            discount: 10,
            inStock: true
        },
        {
            id: 9,
            name: "iPad Air 5th Gen",
            category: "electronics",
            price: 59999,
            originalPrice: 64999,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&auto=format",
            rating: 4.8,
            reviews: 1923,
            discount: 8,
            inStock: true
        },
        {
            id: 10,
            name: "PlayStation 5",
            category: "gaming",
            price: 49999,
            originalPrice: 54999,
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop&auto=format",
            rating: 4.9,
            reviews: 3456,
            discount: 9,
            inStock: false
        },
        {
            id: 11,
            name: "Gaming Chair Pro",
            category: "furniture",
            price: 15999,
            originalPrice: 24999,
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&auto=format",
            rating: 4.3,
            reviews: 892,
            discount: 36,
            inStock: true
        },
        {
            id: 12,
            name: "JBL Flip 6",
            category: "electronics",
            price: 7999,
            originalPrice: 12999,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&auto=format",
            rating: 4.2,
            reviews: 2890,
            discount: 38,
            inStock: true
        }
    ];

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'gaming', label: 'Gaming' },
        { value: 'furniture', label: 'Furniture' }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'discount':
                return b.discount - a.discount;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedToCart(product.id);
        setAnimatingCartProductId(product.id);

        setTimeout(() => {
            setAddedToCart(null);
        }, 2000);

        setTimeout(() => {
            setAnimatingCartProductId(null); // Reset animation state after 1.5s
        }, 1500);
    };

    return (
        <Container className="product-page py-4">
            {/* Success Alert Popup */}
            {addedToCart && (
                <Alert
                    variant="success"
                    className="d-flex align-items-center"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1050, // Ensure it's above other content
                        minWidth: '300px', // Optional: set a minimum width
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: add some shadow
                    }}
                    onClose={() => setAddedToCart(null)} // Optional: if you want a close button
                    dismissible // Optional: adds a close button
                >
                    <FaCheck className="me-2" />
                    Product added to cart successfully!
                </Alert>
            )}
            {/* Page Header */}
            <Row className="mb-4">
                <Col>
                    <h1 className="page-title">Our Products</h1>
                    <p className="page-subtitle">Discover amazing deals on premium products</p>
                </Col>
            </Row>

            {/* Filters and Search */}
            <Row className="mb-4">
                <Col lg={4} md={6} className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col lg={4} md={6} className="mb-3">
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(category => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col lg={4} md={12} className="mb-3">
                    <Form.Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="discount">Best Discount</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Products Grid */}
            <Row>
                {sortedProducts.map(product => (
                    <Col lg={3} md={4} sm={6} key={product.id} className="mb-4">
                        <Card className="product-card h-100">
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                {product.discount > 0 && (
                                    <Badge bg="danger" className="discount-badge">
                                        {product.discount}% OFF
                                    </Badge>
                                )}
                                {!product.inStock && (
                                    <Badge bg="secondary" className="stock-badge">
                                        Out of Stock
                                    </Badge>
                                )}
                                <div className="product-overlay">
                                    <Button variant="outline-light" size="sm" className="overlay-btn">
                                        <FaHeart />
                                    </Button>
                                </div>
                            </div>
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="product-title">{product.name}</Card.Title>
                                <div className="price-section mb-2">
                                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                                    {product.originalPrice > product.price && (
                                        <span className="original-price ms-2">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                <div className="rating-section mb-3">
                                    <FaStar className="star-icon" />
                                    <span>{product.rating} ({product.reviews.toLocaleString()})</span>
                                </div>
                                <div className="mt-auto">
                                    {!product.inStock ? (
                                        <Button 
                                            variant="secondary" 
                                            className="w-100"
                                            disabled
                                        >
                                            <FaShoppingCart className="me-2" />
                                            Out of Stock
                                        </Button>
                                    ) : (
                                        <button
                                            className={`cart-button w-100 ${animatingCartProductId === product.id ? "clicked" : ""}`}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={animatingCartProductId === product.id} // Disable button during animation
                                        >
                                            <span className="add-to-cart">Add to Cart</span>
                                            <span className="added">Added</span>
                                            <FaShoppingCart className="fa-shopping-cart" />
                                            <FaBox className="fa-box" />
                                        </button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {sortedProducts.length === 0 && (
                <Row>
                    <Col className="text-center py-5">
                        <h4>No products found</h4>
                        <p>Try adjusting your search or filter criteria</p>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Product;