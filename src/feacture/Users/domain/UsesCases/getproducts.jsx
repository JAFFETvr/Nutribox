
export class GetProductCategories {
  constructor(productCategoryRepository) {
    this.repository = productCategoryRepository;
  }

  async execute() {
    return this.repository.getCategories();
  }
}