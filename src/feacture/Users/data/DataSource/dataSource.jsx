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
  async fetchUserBalance() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return { balance: 20.00 };
  }

  async fetchContainers() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/contenedores/');
    if (!response.ok) {
      throw new Error('Error al obtener los contenedores');
    }
    return await response.json();
  }

  async fetchProductById(productId) {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/productos/${productId}/`);
    if (!response.ok) {
      throw new Error(`Error al obtener el producto con ID ${productId}`);
    }
    return await response.json();
  }

  async dispenseProduct(payload) {
    const response = await fetch('http://127.0.0.1:8000/api/v1/contenedores/dispensar/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || 'Error al dispensar el producto';
      throw new Error(errorMessage);
    }
    
    return { success: true };
  }
}