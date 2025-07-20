// src/data/Repository/repository.js

import { productApiDataSource } from '../DataSource/dataSource';
import { Product } from '../../domain/Entities/Product';

export class ProductRepositoryImpl {
  constructor() {
    this.dataSource = productApiDataSource;
  }
  
  async getProducts() {
    const apiProducts = await this.dataSource.getProducts();
    if (!Array.isArray(apiProducts)) {
        console.error('[Repository] ERROR: La respuesta de la API no es un array.', apiProducts);
        return [];
    }
    return apiProducts.map(apiProduct => new Product(
      apiProduct.id,
      apiProduct.nombre,
      apiProduct.precio,
      apiProduct.descripcion,
      apiProduct.url_imagen
    ));
  }

  async addProduct(productData) {
    return this.dataSource.addProduct(productData);
  }

  async updateProduct(productId, productData) {
    return this.dataSource.updateProduct(productId, productData);
  }

  async deleteProduct(productId) {
    return this.dataSource.deleteProduct(productId);
  }
}