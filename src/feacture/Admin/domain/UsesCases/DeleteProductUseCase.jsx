export class DeleteProductUseCase {
  async execute(productId, productRepository) {
    if (!productId) {
      throw new Error("Se requiere un ID de producto para eliminarlo.");
    }
    return productRepository.deleteProduct(productId);
  }
}