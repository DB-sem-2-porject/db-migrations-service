import { AppDataSource } from '../data-source.ts';
import { Inventory } from '../entity/inventory.ts';

export class InventoryService {
  private repository = AppDataSource.getRepository(Inventory);
  
  async createInventory(data: {
    tradingPointId: number;
    productId: number;
    quantity: number;
    sellingPrice: number;
  }): Promise<Inventory> {
    const inventory = this.repository.create(data);
    return this.repository.save(inventory);
  }
  
  async deleteInventory(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}