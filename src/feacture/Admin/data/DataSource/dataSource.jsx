import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Función para otra feature (la mantenemos separada)
export const fetchContenedores = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sensores/`);
    return response.data;
  } catch (error) {
    console.error("[DataSource] Error al obtener contenedores:", error);
    throw error;
  }
};

// Objeto que agrupa todas las operaciones CRUD para Productos
export const productApiDataSource = {
  async getProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/productos/`);
      return response.data;
    } catch (error) {
      console.error("[DataSource] Error al obtener productos:", error);
      throw error;
    }
  },

  async addProduct(productData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/productos/`, productData);
      return response.data;
    } catch (error) {
      console.error("[DataSource] Error al añadir producto:", error);
      throw error;
    }
  },

  async updateProduct(productId, productData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/productos/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(`[DataSource] Error al actualizar producto ID ${productId}:`, error);
      throw error;
    }
  },

  async deleteProduct(productId) {
    const url = `${API_BASE_URL}/productos/${productId}`;
    console.log(`%c[DataSource] Realizando petición DELETE a: ${url}`, 'color: blue; font-weight: bold;');
    
    try {
      const response = await axios.delete(url);
      // Log para depurar: ¿Qué responde la API?
      console.log('%c[DataSource] Respuesta de la API (DELETE):', 'color: blue; font-weight: bold;', response);
      return response.data;
    } catch (error) {
      console.error(`[DataSource] Error al eliminar el producto con ID ${productId}:`, error);
      throw error;
    }
  }
};

export class ContenedorApiDataSource {
  
  async getContenedores() {
        const url = `${API_BASE_URL}/contenedores/`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
export class SensorRemoteDataSource {
  async getSensorReadings() {
      const url = `${API_BASE_URL}/sensores/`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data; // Devuelve los datos tal como vienen de la API (DTOs)
    } catch (error) {
      console.error("Error en SensorRemoteDataSource:", error);
      throw error; // Propaga el error para que sea manejado más arriba
    }
  }
}