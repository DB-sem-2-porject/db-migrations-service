import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.ts';
import { Employee } from './employee.ts';
import { PROCUREMENT_REQUEST_STATUS_ENUM_NAME, ProcurementRequestStatus } from './enum/procurement_request_status.ts';
import { ProcurementRequest } from './procurement_request.ts';
import { Product } from './product.js';

@Entity({ name: 'procurement_request_items' })
export class ProcurementRequestItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProcurementRequest, { nullable: false })
  @JoinColumn({
    name: 'request_id',
    referencedColumnName: 'id'
  })
  request!: ProcurementRequest;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id' })
  product!: Product;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  quantity!: number;

  constructor(data?: {
    request: ProcurementRequest;
    product: Product;
    quantity?: number;
  }) {
    if (data) {
      this.request = data.request;
      this.product = data.product;
      this.quantity = data.quantity ?? 1;
    }
  }
}