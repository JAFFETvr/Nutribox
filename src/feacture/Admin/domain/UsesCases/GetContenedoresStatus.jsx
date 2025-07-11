export class GetContenedoresStatus {
  constructor(contenedorRepository) {
    this.contenedorRepository = contenedorRepository;
  }

  async execute() {
    return this.contenedorRepository.getContenedores();
  }
}