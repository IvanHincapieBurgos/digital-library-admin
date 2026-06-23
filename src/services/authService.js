import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
  async login(correo, contrasena) {
    const response = await axios.post(`${API_URL}/login`, {
      correo,
      contrasena
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  async register(nombre, correo, contrasena) {
    const response = await axios.post(`${API_URL}/register`, {
      nombre,
      correo,
      contrasena
    });
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated() {
    return localStorage.getItem('user') !== null;
  }
}

export default new AuthService();
