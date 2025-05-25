import { AppDataSource } from '../data-source.ts';
import { ProvideProductList } from '../entity/provide-product-list.ts';

export class ProvideProductListService {
  private repository = AppDataSource.getRepository(ProvideProductList);
  
  async createProductList(data: {
    providerId: number;
    productId: number;
    price: number;
  }): Promise<ProvideProductList> {
    const productList = this.repository.create(data);
    return this.repository.save(productList);
  }
  
  async deleteProductList(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}