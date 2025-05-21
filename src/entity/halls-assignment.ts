import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { Employee } from './employee.ts';
import { TradingPointHall } from './trading-point-hall.js';

@Entity({ name: 'halls_assignment' })
export class HallsAssignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  @JoinColumn({
    name: 'employee_id',
    referencedColumnName: 'id' })
  employeeId!: Employee;

  @ManyToOne(() => TradingPointHall)
  @JoinColumn({
    name: 'hall_id',
    referencedColumnName: 'id' })
  hallId!: TradingPointHall;

  constructor(data?: {
    employeeId: Employee,
    hallId: TradingPointHall
  }) {
    if (data) {
      this.employeeId = data.employeeId;
      this.hallId = data.hallId;
    }
  }
}