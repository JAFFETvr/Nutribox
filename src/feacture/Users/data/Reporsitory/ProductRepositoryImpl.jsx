import { ProductAPI } from "../DataSource/dataSource";

export class JugosRepositoryImpl {
  constructor() {
    this.api = new ProductAPI();
  }

  async getBalance() {
    return await this.api.fetchUserBalance();
  }

  async getAll() {
    const containers = await this.api.fetchContainers();
    const productPromises = containers.map(async (container) => {
      const productDetails = await this.api.fetchProductById(container.id_producto);
      return { 
        ...productDetails,
        tipo: container.tipo
      };
    });
    return await Promise.all(productPromises);
  }

  async dispenseProduct(dispenseData) {
    return await this.api.dispenseProduct(dispenseData);
  }
}