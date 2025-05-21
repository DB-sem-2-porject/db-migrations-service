import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.js';
import { Employee } from './employee.js';
import { Provider } from './provider.js';
import { ORDER_STATUS_ENUM_NAME, OrderStatus } from './enum/order_status.js';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;


  @Column({
    name: 'full_name',
    type: 'varchar',
    nullable: false,
  })
  fullName?: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    enumName: ORDER_STATUS_ENUM_NAME
  })
  status!: OrderStatus;

  @Column({
    name: 'total_cost',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  totalCost!: number;

  @Column({
    name: 'notes',
    type: 'text',
    default: '',
    nullable: true
  })
  notes?: string;

  constructor(data?: {
    provider: Provider;
    orderDate?: Date;
    status?: OrderStatus;
    totalCost?: number;
    notes?: string;
  }) {
    if (data) {
      this.provider = data.provider;
      this.orderDate = data.orderDate ?? new Date();
      this.status = data.status ?? OrderStatus.New;
      this.notes = data.notes ?? '';
    }
  }
}