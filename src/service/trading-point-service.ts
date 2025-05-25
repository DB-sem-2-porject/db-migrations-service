import { AppDataSource } from '../data-source.ts';
import { TradingPoint } from '../entity/trading-point.ts';
import { TradingPointType } from '../entity/enum/trading-point-type.ts';

export class TradingPointService {
  private repository = AppDataSource.getRepository(TradingPoint);
  
  async createTradingPoint(data: {
    type: TradingPointType;
    name: string;
    address: string;
    managerId?: number;
  }): Promise<TradingPoint> {
    const tradingPoint = this.repository.create(data);
    return this.repository.save(tradingPoint);
  }
  
  async deleteTradingPoint(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}