export class UpdateProductUseCase {
  async execute(productId, productData, productRepository) {
    if (!productId) {
      throw new Error("Se requiere un ID de producto para actualizarlo.");
    }
    if (!productData.nombre || productData.nombre.trim() === '') {
      throw new Error("El nombre es obligatorio.");
    }
    if (productData.precio <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }
    return productRepository.updateProduct(productId, productData);
  }
}