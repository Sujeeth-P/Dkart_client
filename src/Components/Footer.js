import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import './css/Footer.css';

const Footer = () => {
    return (
        <footer
            className="bg-primary text-white py-4 mt-5 mb-0"
            style={{ backgroundColor: '#1A1F36' }}
        >
            <Container>
                {/* Footer Top */}
                <Row className="mb-4">
                    {/* Brand Column */}                    <Col lg={3} md={12} className="mb-4 mb-lg-0 text-center text-lg-start">
                        <div className="logo-container d-flex justify-content-center align-items-center rounded mb-3 mx-auto mx-lg-0">
                            <div className="brand-logo">
                                <span className="brand-d">D</span>
                                <span className="brand-kart">Kart</span>
                            </div>
                        </div>
                        <p className="text-white">Discover the best products at unbeatable prices.</p>
                        <div className="brand-tagline">
                            <small className="text-light">India's Biggest Online Store</small>
                        </div>
                    </Col>

                    {/* Links Columns */}
                    <Col lg={9}>
                        <Row>
                            {/* Shop Section */}                            <Col md={3} sm={6} className="mb-4 mb-md-0">
                                <h5>Shop</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><span className="text-white">Gift cards</span></li>
                                    <li className="mb-2"><span className="text-white">D-Kart Registry</span></li>
                                    <li className="mb-2"><span className="text-white">Sitemap</span></li>
                                    <li className="mb-2"><span className="text-white">D-Kart blog</span></li>
                                    <li className="mb-2"><span className="text-white">D-Kart United Kingdom</span></li>
                                    <li className="mb-2"><span className="text-white">D-Kart India</span></li>
                                    <li className="mb-2"><span className="text-white">D-Kart Canada</span></li>
                                </ul>
                            </Col>

                            {/* Sell Section */}                            <Col md={3} sm={6} className="mb-4 mb-md-0">
                                <h5>Sell</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><span className="text-white">Sell on D-Kart</span></li>
                                    <li className="mb-2"><span className="text-white">Teams</span></li>
                                    <li className="mb-2"><span className="text-white">Forums</span></li>
                                    <li className="mb-2"><span className="text-white">Affiliates & Creators</span></li>
                                </ul>
                            </Col>

                            {/* About Section */}                            <Col md={3} sm={6} className="mb-4 mb-md-0">
                                <h5>About</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><span className="text-white">D-Kart, Inc.</span></li>
                                    <li className="mb-2"><span className="text-white">Policies</span></li>
                                    <li className="mb-2"><span className="text-white">Investors</span></li>
                                    <li className="mb-2"><span className="text-white">Careers</span></li>
                                    <li className="mb-2"><span className="text-white">Press</span></li>
                                    <li className="mb-2"><span className="text-white">Impact</span></li>
                                </ul>
                            </Col>

                            <Col md={3} sm={6}>
                                <h5>Help</h5>
                                <ul className="list-unstyled mb-4">
                                    <li className="mb-2"><span className="text-white">Help Center</span></li>
                                    <li className="mb-2"><span className="text-white">Privacy settings</span></li>
                                </ul>
                                <div className="social-links d-flex gap-3">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                        <FaFacebook />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5">
                                        <FaYoutube />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <hr className="my-4 bg-light opacity-25" />

                <Row className="align-items-center">
                        <Col className="d-flex justify-content-center align-items-center">
                        <div className="d-flex flex-wrap gap-3 justify-content-md-end">
                            <span >© 2025 D-Kart, Inc.</span>
                            <span className="text-white">Terms of Use</span>
                            <span className="text-white">Privacy</span>
                            <span className="text-white">Local Shops</span>
                            <span className="text-white">Regions</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;