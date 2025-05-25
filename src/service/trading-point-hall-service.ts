import { AppDataSource } from '../data-source.ts';
import { TradingPointHall } from '../entity/trading-point-hall.ts';

export class TradingPointHallService {
  private repository = AppDataSource.getRepository(TradingPointHall);
  
  async createHall(data: {
    tradingPointId: number;
    name: string;
    description?: string;
  }): Promise<TradingPointHall> {
    const hall = this.repository.create(data);
    return this.repository.save(hall);
  }
  
  async deleteHall(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}