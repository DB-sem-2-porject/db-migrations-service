import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.js';
import { DepartmentStoreSection } from './department-store-section.js';

@Entity({ name: 'trading_point_halls' })
export class TradingPointHall {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @ManyToOne(() => TradingPoint, { nullable: false })
  @JoinColumn({ name: 'trading_point_id' })
  tradingPoint!: TradingPoint;

  @ManyToOne(() => DepartmentStoreSection, { nullable: true })
  @JoinColumn({ name: 'section_id' })
  section?: DepartmentStoreSection;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'int', name: 'floor_number', default: 1 })
  floorNumber!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, name: 'size_sqm', nullable: true })
  sizeSqm!: number;

  constructor(data?: {
    tradingPoint: TradingPoint;
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