import { ProductCategory } from '../../domain/Entitie/entitie';
import { MockProductCategoryApi } from '../DataSource/dataSource';
export class ProductCategoryRepositoryImpl {
  async getCategories() {
    const apiData = await MockProductCategoryApi.getCategories();
    return apiData.map(item => new ProductCategory(item.id, item.name));
  }
}