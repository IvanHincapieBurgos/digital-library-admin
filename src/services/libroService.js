import axios from 'axios';

const API_URL = 'http://localhost:8080/api/libros';

class LibroService {
  async getAll() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async getDisponibles() {
    const response = await axios.get(`${API_URL}/disponibles`);
    return response.data;
  }

  async getById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }

  async create(libro) {
    const response = await axios.post(API_URL, libro);
    return response.data;
  }

  async update(id, libro) {
    const response = await axios.put(`${API_URL}/${id}`, libro);
    return response.data;
  }

  async delete(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
}

export default new LibroService();
