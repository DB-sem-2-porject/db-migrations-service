import { AppDataSource } from '../data-source.ts';
import { Order } from '../entity/order.ts';

export class OrderService {
  private repository = AppDataSource.getRepository(Order);
  
  async createOrder(data: {
    customerId?: number;
    tradingPointId: number;
    employeeId: number;
    orderDate?: Date;
    status?: string;
  }): Promise<Order> {
    const order = this.repository.create({
      ...data,
      orderDate: data.orderDate || new Date()
    });
    return this.repository.save(order);
  }
  
  async deleteOrder(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}