import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaBook } from 'react-icons/fa';
import authService from '../services/authService';
import Swal from 'sweetalert2';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await authService.register(nombre, correo, contrasena);
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente',
        timer: 2000,
        showConfirmButton: false
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Error al registrar usuario');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo completar el registro'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <FaBook size={60} className="text-primary mb-3" />
                  <h2 className="fw-bold">Crear Cuenta</h2>
                  <p className="text-muted">Únete a nuestra biblioteca digital</p>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaUser className="me-2" />
                      Nombre Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Juan Pérez"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaEnvelope className="me-2" />
                      Correo Electrónico
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Confirmar Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={confirmarContrasena}
                      onChange={(e) => setConfirmarContrasena(e.target.value)}
                      required
                      size="lg"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Registrando...' : 'Crear Cuenta'}
                  </Button>
                  <div className="text-center">
                    <p className="mb-0">
                      ¿Ya tienes cuenta?{' '}
                      <Link to="/login" className="text-decoration-none fw-bold">
                        Inicia sesión
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
