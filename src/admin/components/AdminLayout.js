import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAdmin } from '../context/AdminContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/admin/products', label: 'Products', icon: 'fas fa-box' },
    { path: '/admin/products/add', label: 'Add Product', icon: 'fas fa-plus' },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Top Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/admin/dashboard" className="fw-bold">
            <i className="fas fa-shield-alt me-2"></i>
            D-Kart Admin
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
            
            <Nav>
              <NavDropdown
                title={
                  <span>
                    <i className="fas fa-user-circle me-2"></i>
                    {admin?.username || 'Admin'}
                  </span>
                }
                id="admin-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate('/admin/profile')}>
                  <i className="fas fa-user me-2"></i>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main className="py-4">
        <Container fluid>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default AdminLayout;
