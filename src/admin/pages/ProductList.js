import React, { useState, useEffect } from 'react';
import { 
  Row, Col, Card, Button, Table, Badge, Spinner, Alert, 
  Form, InputGroup, Pagination, Modal 
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/adminAPI';
import AdminLayout from '../components/AdminLayout';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    category: '',
    isActive: '',
    sortBy: 'createdAt:desc'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const navigate = useNavigate();

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 
    'Sports', 'Beauty', 'Toys', 'Automotive', 'Other'
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProducts(filters);
      if (response.success) {
        setProducts(response.products);
        setPagination(response.pagination);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      setDeleteLoading(true);
      const response = await productAPI.deleteProduct(productToDelete._id);
      if (response.success) {
        setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
        setShowDeleteModal(false);
        setProductToDelete(null);
      } else {
        setError(response.message || 'Failed to delete product');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting product');
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderPagination = () => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const items = [];
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        disabled={!pagination.hasPrev}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // Page numbers
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        disabled={!pagination.hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return <Pagination className="justify-content-center">{items}</Pagination>;
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-box me-2"></i>
          Product Management
        </h2>
        <Button variant="primary" onClick={() => navigate('/admin/products/add')}>
          <i className="fas fa-plus me-2"></i>
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Products</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by name or description..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <i className="fas fa-search"></i>
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={filters.isActive}
                  onChange={(e) => handleFilterChange('isActive', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="createdAt:desc">Newest First</option>
                  <option value="createdAt:asc">Oldest First</option>
                  <option value="name:asc">Name A-Z</option>
                  <option value="name:desc">Name Z-A</option>
                  <option value="price:asc">Price Low-High</option>
                  <option value="price:desc">Price High-Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Per Page</Form.Label>
                <Form.Select
                  value={filters.limit}
                  onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {/* Products Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No products found</h5>
              <p className="text-muted">Try adjusting your filters or add a new product.</p>
            </div>
          ) : (
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="rounded me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-1">{product.name}</h6>
                          <small className="text-muted">SKU: {product.sku}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{product.category}</Badge>
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>
                      <Badge bg={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'danger'}>
                        {product.stock}
                      </Badge>
                    </td>
                    <td>
                      <Badge bg={product.isActive ? 'success' : 'danger'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td>{formatDate(product.createdAt)}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Pagination */}
      {renderPagination()}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteProduct}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default ProductList;
