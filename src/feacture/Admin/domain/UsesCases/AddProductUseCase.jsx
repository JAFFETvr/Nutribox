export class AddProductUseCase {
  async execute(productData, productRepository) {
    if (!productData.nombre || productData.nombre.trim() === '') {
      throw new Error("El nombre es obligatorio.");
    }
    if (productData.precio <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }
    return productRepository.addProduct(productData);
  }
}