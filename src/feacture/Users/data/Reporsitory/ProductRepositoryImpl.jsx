import { ProductAPI } from "../DataSource/dataSource";

export class JugosRepositoryImpl {
  constructor() {
    this.api = new ProductAPI();
  }

  async getAll() {
    return await this.api.fetchAll();
  }
}