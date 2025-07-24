// src/domain/UsesCases/DeleteContenedor.js

export class DeleteContenedor {
  /**
   * @param {import('../../data/Repository/ContenedorRepository').ContenedorRepositoryImpl} contenedorRepository 
   */
  constructor(contenedorRepository) {
    this.contenedorRepository = contenedorRepository;
  }

  /**
   * Ejecuta el caso de uso para eliminar un contenedor.
   * @param {string | number} containerId El ID del contenedor a eliminar.
   */
  async execute(containerId) {
    // Llama al método `delete` que vamos a añadir al repositorio.
    return this.contenedorRepository.delete(containerId);
  }
}