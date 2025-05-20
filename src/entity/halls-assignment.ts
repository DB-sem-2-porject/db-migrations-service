import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import 'reflect-metadata';
import { Employee } from './employee.ts';
import { TradingPointHall } from './trading-point-halls.js';

@Entity({ name: 'HallsAssignment' })
export class HallsAssignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employee)
  @JoinColumn({
    name: 'employeeId',
    referencedColumnName: 'id' })
  employeeId!: string;

  @ManyToOne(() => TradingPointHall)
  @JoinColumn({
    name: 'hallId',
    referencedColumnName: 'id' })
  hallId!: number;

  constructor(data?: {
    employeeId: string,
    hallId: number
  }) {
    if (data) {
      this.employeeId = data.employeeId;
      this.hallId = data.hallId;
    }
  }
}