import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Modal, Form, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import Layout from '../components/Layout';
import libroService from '../services/libroService';
import Swal from 'sweetalert2';

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLibro, setCurrentLibro] = useState({
    idLibro: null,
    titulo: '',
    autor: '',
    año: '',
    isbn: '',
    disponible: true
  });

  useEffect(() => {
    loadLibros();
  }, []);

  const loadLibros = async () => {
    try {
      const data = await libroService.getAll();
      setLibros(data);
    } catch (error) {
      console.error('Error al cargar libros:', error);
      Swal.fire('Error', 'No se pudieron cargar los libros', 'error');
    }
  };

  const handleShowModal = (libro = null) => {
    if (libro) {
      setCurrentLibro(libro);
      setEditMode(true);
    } else {
      setCurrentLibro({
        idLibro: null,
        titulo: '',
        autor: '',
        año: '',
        isbn: '',
        disponible: true
      });
      setEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLibro({
      idLibro: null,
      titulo: '',
      autor: '',
      año: '',
      isbn: '',
      disponible: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await libroService.update(currentLibro.idLibro, currentLibro);
        Swal.fire('¡Actualizado!', 'El libro ha sido actualizado', 'success');
      } else {
        await libroService.create(currentLibro);
        Swal.fire('¡Creado!', 'El libro ha sido agregado', 'success');
      }
      loadLibros();
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el libro', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await libroService.delete(id);
        Swal.fire('¡Eliminado!', 'El libro ha sido eliminado', 'success');
        loadLibros();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el libro', 'error');
      }
    }
  };

  return (
    <Layout>
      <Container className="py-5">
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <h4 className="mb-0">
              <FaBook className="me-2" />
              Gestión de Libros
            </h4>
            <Button variant="light" onClick={() => handleShowModal()}>
              <FaPlus className="me-2" />
              Nuevo Libro
            </Button>
          </Card.Header>
          <Card.Body>
            {libros.length === 0 ? (
              <div className="text-center py-5">
                <FaBook size={60} className="text-muted mb-3" />
                <p className="text-muted">No hay libros registrados</p>
                <Button variant="primary" onClick={() => handleShowModal()}>
                  Agregar primer libro
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Año</th>
                      <th>ISBN</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {libros.map((libro) => (
                      <tr key={libro.idLibro}>
                        <td>{libro.idLibro}</td>
                        <td><strong>{libro.titulo}</strong></td>
                        <td>{libro.autor}</td>
                        <td>{libro.año}</td>
                        <td>{libro.isbn || 'N/A'}</td>
                        <td>
                          <Badge bg={libro.disponible ? 'success' : 'danger'}>
                            {libro.disponible ? 'Disponible' : 'Prestado'}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleShowModal(libro)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(libro.idLibro)}
                          >
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Modal para Crear/Editar */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? 'Editar Libro' : 'Nuevo Libro'}
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Título *</Form.Label>
                <Form.Control
                  type="text"
                  value={currentLibro.titulo}
                  onChange={(e) => setCurrentLibro({ ...currentLibro, titulo: e.target.value })}
                  required
                  placeholder="Ej: Cien años de soledad"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Autor *</Form.Label>
                <Form.Control
                  type="text"
                  value={currentLibro.autor}
                  onChange={(e) => setCurrentLibro({ ...currentLibro, autor: e.target.value })}
                  required
                  placeholder="Ej: Gabriel García Márquez"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Año *</Form.Label>
                <Form.Control
                  type="number"
                  value={currentLibro.año}
                  onChange={(e) => setCurrentLibro({ ...currentLibro, año: parseInt(e.target.value) })}
                  required
                  min="1000"
                  max="2100"
                  placeholder="Ej: 1967"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  value={currentLibro.isbn}
                  onChange={(e) => setCurrentLibro({ ...currentLibro, isbn: e.target.value })}
                  placeholder="Ej: 978-0307474728"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Disponible"
                  checked={currentLibro.disponible}
                  onChange={(e) => setCurrentLibro({ ...currentLibro, disponible: e.target.checked })}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editMode ? 'Actualizar' : 'Guardar'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </Layout>
  );
};

export default Libros;
