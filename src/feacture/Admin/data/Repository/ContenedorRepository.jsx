import { Contenedor } from "../../domain/Entities/Contenedor";

export class ContenedorRepositoryImpl {
  constructor(apiDataSource) {
    this.apiDataSource = apiDataSource;
  }

  async getContenedores() {
    const apiData = await this.apiDataSource.getContenedores();
    return apiData.map(item => new Contenedor(item));
  }

  // ========= NUEVO MÉTODO AÑADIDO =========
  async updateContainer(containerId, containerData) {
    // Llamamos al dataSource para que haga la petición PUT
    const updatedApiData = await this.apiDataSource.updateContainer(containerId, containerData);
    // Convertimos la respuesta de la API de nuevo en una entidad de dominio
    return new Contenedor(updatedApiData);
  }

  /**
   * Llama al data source para eliminar un contenedor por su ID.
   * @param {string | number} containerId 
   */
  async delete(containerId) {
    // Aquí está la conexión clave:
    // El método `delete` del repositorio llama al método `deleteContainer` del DataSource.
    return this.apiDataSource.deleteContainer(containerId);
  }
  // =======================================
}