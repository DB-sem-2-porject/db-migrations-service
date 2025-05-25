import { AppDataSource } from '../data-source.ts';
import { ProductRequestItem } from '../entity/product-request-item.ts';

export class ProductRequestItemService {
  private repository = AppDataSource.getRepository(ProductRequestItem);
  
  async createRequestItem(data: {
    requestId: number;
    productId: number;
    quantity: number;
  }): Promise<ProductRequestItem> {
    const requestItem = this.repository.create(data);
    return this.repository.save(requestItem);
  }
  
  async deleteRequestItem(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}