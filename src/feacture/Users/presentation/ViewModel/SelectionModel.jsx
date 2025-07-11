import { useState, useEffect } from 'react';
import { GetProductCategories } from '../../domain/UsesCases/getproducts';
import { ProductCategoryRepositoryImpl } from '../../data/Reporsitory/repository';


const categoryImageMap = {
  'Jugos': '/bebidas.png', 
  'Snacks': '/snacks.png'
};

export const useCategorySelectionViewModel = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const repository = new ProductCategoryRepositoryImpl();
        const getCategoriesUseCase = new GetProductCategories(repository);
        const categoriesFromDomain = await getCategoriesUseCase.execute();

        // Ahora esta línea funciona perfectamente.
        // Buscará 'Jugos' en el mapa y obtendrá el string '/bebidas.png'.
        const categoriesForUI = categoriesFromDomain.map(category => ({
          ...category,
          imageUrl: categoryImageMap[category.name] || '', 
        }));
        
        setCategories(categoriesForUI);

      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSelectCategory = (category) => {
    console.log('Categoría seleccionada:', category);
    alert(`Navegando a la sección de ${category.name}...`);
  };

  return {
    categories,
    loading,
    handleSelectCategory
  };
};