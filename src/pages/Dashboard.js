import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import Layout from '../components/Layout';
import libroService from '../services/libroService';
import prestamoService from '../services/prestamoService';
import authService from '../services/authService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLibros: 0,
    librosDisponibles: 0,
    prestamosActivos: 0
  });
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const libros = await libroService.getAll();
      const disponibles = await libroService.getDisponibles();
      const prestamos = await prestamoService.getActivos();

      setStats({
        totalLibros: libros.length,
        librosDisponibles: disponibles.length,
        prestamosActivos: prestamos.length
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const StatCard = ({ icon, title, value, color, bgColor }) => (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle p-3 me-3"
            style={{ backgroundColor: bgColor }}
          >
            {icon}
          </div>
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h2 className="mb-0 fw-bold" style={{ color }}>{value}</h2>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Layout>
      <Container className="py-5">
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-white mb-2">
            ¡Bienvenido, {user?.nombre}! 👋
          </h1>
          <p className="lead text-white-50">
            Panel de control del sistema de biblioteca
          </p>
        </div>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <StatCard
              icon={<FaBook size={30} color="#3498db" />}
              title="Total de Libros"
              value={stats.totalLibros}
              color="#3498db"
              bgColor="#e3f2fd"
            />
          </Col>
          <Col md={4}>
            <StatCard
              icon={<FaCheckCircle size={30} color="#27ae60" />}
              title="Libros Disponibles"
              value={stats.librosDisponibles}
              color="#27ae60"
              bgColor="#e8f5e9"
            />
          </Col>
          <Col md={4}>
            <StatCard
              icon={<FaClipboardList size={30} color="#e74c3c" />}
              title="Préstamos Activos"
              value={stats.prestamosActivos}
              color="#e74c3c"
              bgColor="#ffebee"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5 text-center">
                <FaBook size={80} className="text-primary mb-4" />
                <h3 className="mb-3">Sistema de Gestión de Biblioteca</h3>
                <p className="text-muted mb-4">
                  Administra libros, usuarios y préstamos de manera eficiente
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-0">📚 Gestión de Libros</h5>
                    <small className="text-muted">CRUD completo</small>
                  </div>
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-0">📋 Control de Préstamos</h5>
                    <small className="text-muted">Seguimiento en tiempo real</small>
                  </div>
                  <div className="p-3 bg-light rounded">
                    <h5 className="mb-0">👥 Gestión de Usuarios</h5>
                    <small className="text-muted">Registro y autenticación</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
