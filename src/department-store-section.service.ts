import { AppDataSource } from './data-source.ts';
import { DepartmentStoreSection } from './entity/department-store-section.ts';
import { TradingPoint } from './entity/trading-point.js';
import { TradingPointType } from './entity/enum/trading-point-type.ts';

export class DepartmentStoreSectionService {
  async createSection(data: {
    tradingPointId: number;
    name: string;
    floorNumber: number;
    managerId?: number;
  }): Promise<DepartmentStoreSection> {
    const tradingPointsRepository = AppDataSource.getRepository(TradingPoint);

    const tradingPoint = await tradingPointsRepository.findOneByOrFail({ id: data.tradingPointId });

    if (tradingPoint.type !== TradingPointType.DepartmentStore) {
      throw new Error('Sections can only be created in department stores');
    }

    const sectionRepo = AppDataSource.getRepository(DepartmentStoreSection);
    const section = sectionRepo.create({
      name: data.name,
      floorNumber: data.floorNumber,
      tradingPoint: tradingPoint,
      manager: data.managerId ? { id: data.managerId } as any : undefined,
    });

    return sectionRepo.save(section);
  }
}
