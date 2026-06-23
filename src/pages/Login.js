import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaBook } from 'react-icons/fa';
import authService from '../services/authService';
import Swal from 'sweetalert2';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(correo, contrasena);
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, intente de nuevo.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <FaBook size={60} className="text-primary mb-3" />
                  <h2 className="fw-bold">Biblioteca Digital</h2>
                  <p className="text-muted">Inicia sesión en tu cuenta</p>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
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
                  <Form.Group className="mb-4">
                    <Form.Label>
                      <FaLock className="me-2" />
                      Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
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
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                  <div className="text-center">
                    <p className="mb-0">
                      ¿No tienes cuenta?{' '}
                      <Link to="/register" className="text-decoration-none fw-bold">
                        Regístrate aquí
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

export default Login;
