import { AppDataSource } from '../data-source.ts';
import { InventoryTransfer } from '../entity/inventory-transfer.ts';
import { TransferStatus } from '../entity/enum/transfer-status.js';


export class InventoryTransferService {
  private repository = AppDataSource.getRepository(InventoryTransfer);
  
  async createTransfer(data: {
    sourcePointId: number;
    destinationPointId: number;
    productId: number;
    quantity: number;
    initiatedById: number;
    approvedById?: number;
    status?: TransferStatus;
  }): Promise<InventoryTransfer> {
    if (data.sourcePointId === data.destinationPointId) {
      throw new Error('Source and destination points must be different');
    }
    const transfer = this.repository.create(data);
    return this.repository.save(transfer);
  }
  
  async deleteTransfer(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}