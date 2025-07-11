export const MockProductCategoryApi = {
  getCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 'cat_1', name: 'Jugos' },
      { id: 'cat_2', name: 'Snacks' },
    ];
  }
};

export class ProductAPI {
  async fetchAll() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/productos/');
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return await response.json();
  }
}
