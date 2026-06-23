import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaUndo } from 'react-icons/fa';
import Layout from '../components/Layout';
import prestamoService from '../services/prestamoService';
import libroService from '../services/libroService';
import authService from '../services/authService';
import Swal from 'sweetalert2';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedLibro, setSelectedLibro] = useState('');
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadPrestamos();
    loadLibrosDisponibles();
  }, []);

  const loadPrestamos = async () => {
    try {
      const data = await prestamoService.getAll();
      setPrestamos(data);
    } catch (error) {
      console.error('Error al cargar préstamos:', error);
    }
  };

  const loadLibrosDisponibles = async () => {
    try {
      const data = await libroService.getDisponibles();
      setLibrosDisponibles(data);
    } catch (error) {
      console.error('Error al cargar libros disponibles:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    loadLibrosDisponibles();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedLibro('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLibro) {
      Swal.fire('Error', 'Seleccione un libro', 'error');
      return;
    }

    try {
      await prestamoService.create({
        idUsuario: user.id,
        idLibro: parseInt(selectedLibro)
      });
      Swal.fire('¡Éxito!', 'Préstamo registrado correctamente', 'success');
      loadPrestamos();
      loadLibrosDisponibles();
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', error.response?.data || 'No se pudo crear el préstamo', 'error');
    }
  };

  const handleDevolver = async (id) => {
    const result = await Swal.fire({
      title: '¿Devolver libro?',
      text: 'Confirme la devolución del libro',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, devolver',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await prestamoService.devolver(id);
        Swal.fire('¡Devuelto!', 'El libro ha sido devuelto', 'success');
        loadPrestamos();
        loadLibrosDisponibles();
      } catch (error) {
        Swal.fire('Error', 'No se pudo devolver el libro', 'error');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <Layout>
      <Container className="py-5">
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0">
              📋 Gestión de Préstamos
            </h4>
            <Button variant="light" onClick={handleShowModal}>
              <FaPlus className="me-2" />
              Nuevo Préstamo
            </Button>
          </Card.Header>
          <Card.Body>
            {prestamos.length === 0 ? (
              <div className="text-center py-5">
                <FaPlus size={60} className="text-muted mb-3" />
                <p className="text-muted">No hay préstamos registrados</p>
                <Button variant="success" onClick={handleShowModal}>
                  Registrar primer préstamo
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Libro</th>
                      <th>F. Préstamo</th>
                      <th>F. Devolución Esperada</th>
                      <th>F. Devolución Real</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prestamos.map((prestamo) => (
                      <tr key={prestamo.idPrestamo}>
                        <td>{prestamo.idPrestamo}</td>
                        <td>{prestamo.usuario?.nombre}</td>
                        <td><strong>{prestamo.libro?.titulo}</strong></td>
                        <td>{formatDate(prestamo.fechaPrestamo)}</td>
                        <td>{formatDate(prestamo.fechaDevolucionEsperada)}</td>
                        <td>{formatDate(prestamo.fechaDevolucionReal)}</td>
                        <td>
                          <Badge bg={prestamo.estado === 'ACTIVO' ? 'warning' : 'success'}>
                            {prestamo.estado}
                          </Badge>
                        </td>
                        <td>
                          {prestamo.estado === 'ACTIVO' && (
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleDevolver(prestamo.idPrestamo)}
                            >
                              <FaUndo className="me-1" />
                              Devolver
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal para Nuevo Préstamo */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Nuevo Préstamo</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.nombre}
                  disabled
                />
                <Form.Text className="text-muted">
                  Usuario autenticado actualmente
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Libro *</Form.Label>
                <Form.Select
                  value={selectedLibro}
                  onChange={(e) => setSelectedLibro(e.target.value)}
                  required
                >
                  <option value="">Seleccione un libro...</option>
                  {librosDisponibles.map((libro) => (
                    <option key={libro.idLibro} value={libro.idLibro}>
                      {libro.titulo} - {libro.autor} ({libro.año})
                    </option>
                  ))}
                </Form.Select>
                {librosDisponibles.length === 0 && (
                  <Form.Text className="text-danger">
                    No hay libros disponibles en este momento
                  </Form.Text>
                )}
              </Form.Group>
              <div className="alert alert-info">
                <small>
                  <strong>📌 Nota:</strong> El período de préstamo es de 15 días calendario
                </small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={librosDisponibles.length === 0}
              >
                Registrar Préstamo
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </Layout>
  );
};

export default Prestamos;
