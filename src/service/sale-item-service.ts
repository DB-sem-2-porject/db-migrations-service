import { AppDataSource } from '../data-source.ts';
import { SaleItem } from '../entity/sale-item.ts';

export class SaleItemService {
  private repository = AppDataSource.getRepository(SaleItem);
  
  async createSaleItem(data: {
    saleId: number;
    productId: number;
    quantity: number;
    price: number;
  }): Promise<SaleItem> {
    const saleItem = this.repository.create(data);
    return this.repository.save(saleItem);
  }
  
  async deleteSaleItem(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}