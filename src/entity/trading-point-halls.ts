import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { TradingPoints } from './trading-points.js';
import { DepartmentStoreSection } from './department-store-section.js';

@Entity({ name: 'TradingPointHalls' })
export class TradingPointHall {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @ManyToOne(() => TradingPoints, { nullable: false })
  @JoinColumn({ name: 'tradingPointId' })
  tradingPoint!: TradingPoints;

  @ManyToOne(() => DepartmentStoreSection, { nullable: true })
  @JoinColumn({ name: 'sectionId' })
  section?: DepartmentStoreSection;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'int', name: 'floorNumber', default: 1 })
  floorNumber!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, name: 'sizeSqm', nullable: true })
  sizeSqm!: number;

  constructor(data?: {
    tradingPoint: TradingPoints;
    section: DepartmentStoreSection;
    name: string;
    floorNumber: number;
    sizeSqm: number;
  }) {
    if (data) {
      this.tradingPoint = data.tradingPoint;
      this.section = data.section ?? null;
      this.name = data.name;
      this.floorNumber = data.floorNumber ?? 1;
      this.sizeSqm = data.sizeSqm;
    }
  }
}