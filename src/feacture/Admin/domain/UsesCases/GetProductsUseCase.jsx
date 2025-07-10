export class GetProductsUseCase {
  async execute(productRepository) {
    return productRepository.getProducts();
  }
}