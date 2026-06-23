import axios from 'axios';

const API_URL = 'http://localhost:8080/api/prestamos';

class PrestamoService {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getActivos() {
    const response = await axios.get(`${API_URL}/activos`);
    return response.data;
  }

  async create(prestamoData) {
    const response = await axios.post(API_URL, prestamoData);
    return response.data;
  }

  async devolver(id) {
    const response = await axios.put(`${API_URL}/${id}/devolver`);
    return response.data;
  }
}

export default new PrestamoService();
