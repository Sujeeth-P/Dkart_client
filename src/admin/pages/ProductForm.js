import React, { useState, useEffect } from 'react';
import { 
  Row, Col, Card, Button, Form, Alert, Spinner, Badge 
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../utils/adminAPI';
import AdminLayout from '../components/AdminLayout';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
    sku: '',
    tags: [],
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [validated, setValidated] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 
    'Sports', 'Beauty', 'Toys', 'Automotive', 'Other'
  ];

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchProduct();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProduct(id);
      if (response.success) {
        const product = response.product;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          category: product.category,
          image: product.image,
          stock: product.stock.toString(),
          sku: product.sku,
          tags: product.tags || [],
          isActive: product.isActive
        });
      } else {
        setError(response.message || 'Failed to fetch product');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      };

      const response = isEditing 
        ? await productAPI.updateProduct(id, submitData)
        : await productAPI.createProduct(submitData);
      
      if (response.success) {
        setSuccess(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
        setTimeout(() => {
          navigate('/admin/products');
        }, 1500);
      } else {
        setError(response.message || 'Failed to save product');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
      setValidated(true);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  if (isEditing && loading && !formData.name) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-box me-2"></i>
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        <Button variant="outline-secondary" onClick={handleCancel}>
          <i className="fas fa-arrow-left me-2"></i>
          Back to Products
        </Button>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          <i className="fas fa-check-circle me-2"></i>
          {success}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter product name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid product name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU *</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    placeholder="Enter SKU (e.g., ELC-001)"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid SKU.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter product description"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid description.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid price.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    placeholder="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid stock quantity.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Product Image URL *</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid image URL.
              </Form.Control.Feedback>
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Product preview"
                    className="img-thumbnail"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    bg="primary" 
                    className="d-flex align-items-center gap-1"
                  >
                    {tag}
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-white"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <i className="fas fa-times"></i>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                />
                <Button variant="outline-secondary" onClick={handleAddTag}>
                  Add Tag
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Product is active"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    {isEditing ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default ProductForm;
