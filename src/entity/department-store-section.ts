import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { TradingPoints } from './trading-points.js';
import { Employee } from './employee.js';

@Entity({ name: 'DepartmentStoreSections' })
export class DepartmentStoreSection {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @ManyToOne(() => TradingPoints, { nullable: false })
  @JoinColumn({ name: 'tradingPointId' })
  tradingPoint!: TradingPoints;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'int', name: 'floorNumber' })
  floorNumber!: number;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: 'managerId', referencedColumnName: 'id' })
  manager?: Employee;

   constructor(data?: {
    tradingPoint: TradingPoints;
    name: string;
    floorNumber: number;
    manager?: Employee;
  }) {
    if (data) {
      this.tradingPoint = data.tradingPoint;
      this.name = data.name;
      this.floorNumber = data.floorNumber;
      this.manager = data.manager;
    }
  }
}