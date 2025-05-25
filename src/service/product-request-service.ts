import { AppDataSource } from '../data-source.ts';
import { ProductRequest } from '../entity/product-request.ts';

export class ProductRequestService {
  private repository = AppDataSource.getRepository(ProductRequest);
  
  async createRequest(data: {
    tradingPointId: number;
    requestDate?: Date;
    status?: string;
    employeeId: number;
  }): Promise<ProductRequest> {
    const request = this.repository.create({
      ...data,
      requestDate: data.requestDate || new Date()
    });
    return this.repository.save(request);
  }
  
  async deleteRequest(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}