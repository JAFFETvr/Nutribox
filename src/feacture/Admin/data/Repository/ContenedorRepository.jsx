import { Contenedor } from "../../domain/Entities/Contenedor";

export class ContenedorRepositoryImpl {
  constructor(apiDataSource) {
    this.apiDataSource = apiDataSource;
  }

  async getContenedores() {
    const apiData = await this.apiDataSource.getContenedores();
    return apiData.map(item => new Contenedor(item));
  }
}