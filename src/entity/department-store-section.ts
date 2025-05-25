import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.js';
import { Employee } from './employee.js';

@Entity({ name: 'department_store_sections' })
export class DepartmentStoreSection {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @ManyToOne(() => TradingPoint, { nullable: false })
  @JoinColumn({
    name: 'trading_point_id',
    referencedColumnName: 'id'
  })
  tradingPoint!: TradingPoint;

  @Column({
    type: 'varchar',
    length: 100
  })
  name!: string;

  @Column({
    type: 'int',
    name: 'floor_number'
  })
  floorNumber!: number;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({
    name: 'manager_id',
    referencedColumnName: 'id'
  })
  managerId?: Employee;

   constructor(data?: {
     name: string;
     tradingPoint: TradingPoint;
     floorNumber: number;
     managerId?: Employee;
  }) {
    if (data) {
      this.tradingPoint = data.tradingPoint;
      this.name = data.name;
      this.floorNumber = data.floorNumber;
      this.managerId = data.managerId;
    }
  }
}