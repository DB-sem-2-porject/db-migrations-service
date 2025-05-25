import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.ts';
import { ProductDirectory } from './product-directory.ts';
import { Employee } from './employee.ts';
import {TransferStatus} from './enum/transfer-status.ts';

@Entity({ name: 'inventory_transfers' })
export class InventoryTransfer {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ name: 'source_point_id', type: 'int', nullable: false })
  sourcePointId!: number;
  
  @ManyToOne(() => TradingPoint)
  @JoinColumn({ name: 'source_point_id' })
  sourcePoint!: TradingPoint;
  
  @Column({ name: 'destination_point_id', type: 'int', nullable: false })
  destinationPointId!: number;
  
  @ManyToOne(() => TradingPoint)
  @JoinColumn({ name: 'destination_point_id' })
  destinationPoint!: TradingPoint;
  
  @Column({ name: 'product_id', type: 'int', nullable: false })
  productId!: number;
  
  @ManyToOne(() => ProductDirectory)
  @JoinColumn({ name: 'product_id' })
  product!: ProductDirectory;
  
  @Column({ type: 'int', nullable: false })
  @Check('positive_quantity', 'quantity > 0')
  quantity!: number;
  
  @Column({
    name: 'transfer_date',
    type: 'timestamp',
    default: () => 'now()'
  })
  transferDate!: Date;
  
  @Column({ name: 'initiated_by', type: 'int', nullable: false })
  initiatedById!: number;
  
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'initiated_by' })
  initiatedBy!: Employee;
  
  @Column({ name: 'approved_by', type: 'int', nullable: true })
  approvedById?: number;
  
  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approved_by' })
  approvedBy?: Employee;
  
  @Column({
    type: 'enum',
    enum: TransferStatus,
    default: TransferStatus.PLANNED
  })
  status!: TransferStatus;
  
  constructor(data?: {
    sourcePointId: number;
    destinationPointId: number;
    productId: number;
    quantity: number;
    initiatedById: number;
    approvedById?: number;
    status?: TransferStatus;
  }) {
    if (data) {
      this.sourcePointId = data.sourcePointId;
      this.destinationPointId = data.destinationPointId;
      this.productId = data.productId;
      this.quantity = data.quantity;
      this.initiatedById = data.initiatedById;
      this.approvedById = data.approvedById;
      this.status = data.status || TransferStatus.PLANNED;
      this.transferDate = new Date();
    }
  }
}2