export class DispenseProduct {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(dispenseData) {
    return await this.repository.dispenseProduct(dispenseData);
  }
}