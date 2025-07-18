import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Badge, Spinner, Alert } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/adminAPI';
import AdminLayout from '../components/AdminLayout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getStats();
      if (response.success) {
        setStats(response.stats);
      } else {
        setError(response.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching statistics');
    } finally {
      setLoading(false);
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

  // Chart data
  const categoryChartData = {
    labels: stats?.categoryStats?.map(cat => cat._id) || [],
    datasets: [
      {
        label: 'Products by Category',
        data: stats?.categoryStats?.map(cat => cat.count) || [],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: ['Active', 'Inactive', 'Out of Stock'],
    datasets: [
      {
        data: [
          stats?.activeProducts || 0,
          stats?.inactiveProducts || 0,
          stats?.outOfStock || 0,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 205, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Statistics',
      },
    },
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <Button variant="link" onClick={fetchStats} className="ms-2">
            Retry
          </Button>
        </Alert>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </h2>
        <Button variant="primary" onClick={() => navigate('/admin/products/add')}>
          <i className="fas fa-plus me-2"></i>
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Total Products</h5>
                  <h3 className="mb-0">{stats?.totalProducts || 0}</h3>
                </div>
                <div className="text-primary">
                  <i className="fas fa-box fa-2x"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Active Products</h5>
                  <h3 className="mb-0 text-success">{stats?.activeProducts || 0}</h3>
                </div>
                <div className="text-success">
                  <i className="fas fa-check-circle fa-2x"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Out of Stock</h5>
                  <h3 className="mb-0 text-warning">{stats?.outOfStock || 0}</h3>
                </div>
                <div className="text-warning">
                  <i className="fas fa-exclamation-triangle fa-2x"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="text-muted mb-1">Categories</h5>
                  <h3 className="mb-0">{stats?.categoryStats?.length || 0}</h3>
                </div>
                <div className="text-info">
                  <i className="fas fa-tags fa-2x"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="mb-4">
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Products by Category</h5>
            </Card.Header>
            <Card.Body>
              <Bar data={categoryChartData} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Product Status</h5>
            </Card.Header>
            <Card.Body>
              <Doughnut data={statusChartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Products and Low Stock */}
      <Row>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Products</h5>
              <Button variant="outline-primary" size="sm" onClick={() => navigate('/admin/products')}>
                View All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Added</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentProducts?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="rounded me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>
                        <Badge bg="secondary">{product.category}</Badge>
                      </td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{formatDate(product.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Low Stock Products</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.lowStockProducts?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="rounded me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>
                        <Badge bg="warning">{product.stock}</Badge>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard;
