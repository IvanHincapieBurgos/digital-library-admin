import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaBook, FaSignOutAlt, FaHome } from 'react-icons/fa';
import authService from '../services/authService';

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <FaBook className="me-2" />
          Biblioteca Digital
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">
              <FaHome className="me-1" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/libros">
              <FaBook className="me-1" />
              Libros
            </Nav.Link>
            <Nav.Link as={Link} to="/prestamos">
              📋 Préstamos
            </Nav.Link>
            <Nav.Item className="d-flex align-items-center ms-3">
              <span className="text-light me-3">
                👤 {user?.nombre}
              </span>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Salir
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
