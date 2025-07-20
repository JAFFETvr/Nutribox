import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchContenedores = async () => {
  try {
    const response = await api.get('/sensores/');
    return response.data;
  } catch (error) {
    console.error("[DataSource] Error al obtener contenedores:", error);
    throw error;
  }
};

export const productApiDataSource = {
  async getProducts() {
    try {
      const response = await api.get('/productos/');
      return response.data;
    } catch (error) {
      console.error("[DataSource] Error al obtener productos:", error);
      throw error;
    }
  },
  async addProduct(productData) {
    const formData = new FormData();
    formData.append('nombre', productData.nombre);
    formData.append('precio', productData.precio);
    formData.append('descripcion', productData.descripcion);
    formData.append('tipo', productData.tipo);
    if (productData.imagen) {
      formData.append('imagen', productData.imagen);
    }
    try {
      const response = await api.post('/productos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error("[DataSource] Error al añadir producto:", error);
      throw error;
    }
  },
  async updateProduct(productId, productData) {
    const formData = new FormData();
    formData.append('nombre', productData.nombre);
    formData.append('precio', productData.precio);
    formData.append('descripcion', productData.descripcion);
    formData.append('tipo', productData.tipo);
    if (productData.imagen) {
      formData.append('imagen', productData.imagen);
    }
    try {
      const response = await api.put(`/productos/${productId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error(`[DataSource] Error al actualizar producto ID ${productId}:`, error);
      throw error;
    }
  },
  async deleteProduct(productId) {
    const url = `/productos/${productId}/`;
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      console.error(`[DataSource] Error al eliminar el producto con ID ${productId}:`, error);
      throw error;
    }
  }
};

export class ContenedorApiDataSource {
  async getContenedores() {
    try {
      const response = await api.get('/contenedores/');
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createContainer(containerData) {
    try {
      const response = await api.post('/contenedores/', containerData);
      return response.data;
    } catch (error) {
      console.error(`[DataSource] Error al crear el contenedor:`, error);
      throw error;
    }
  }
  async deleteContainer(containerId) {
    try {
      await api.delete(`/contenedores/${containerId}/`);
      return { success: true };
    } catch (error) {
      console.error(`[DataSource] Error al eliminar el contenedor ${containerId}:`, error);
      throw error;
    }
  }
}

export class SensorRemoteDataSource {
  async getSensorReadings() {
    try {
      const response = await api.get('/sensores/');
      return response.data;
    } catch (error) {
      console.error("Error en SensorRemoteDataSource:", error);
      throw error;
    }
  }
}