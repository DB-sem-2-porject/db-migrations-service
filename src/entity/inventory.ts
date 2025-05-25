import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import 'reflect-metadata';
import { TradingPoint } from './trading-point.ts';
import { ProductDirectory } from './product-directory.ts';

@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ name: 'trading_point_id', type: 'int', nullable: false })
  tradingPointId!: number;
  
  @ManyToOne(() => TradingPoint)
  @JoinColumn({ name: 'trading_point_id' })
  tradingPoint!: TradingPoint;
  
  @Column({ name: 'product_id', type: 'int', nullable: false })
  productId!: number;
  
  @ManyToOne(() => ProductDirectory)
  @JoinColumn({ name: 'product_id' })
  product!: ProductDirectory;
  
  @Column({ type: 'int', nullable: false, default: 0 })
  quantity!: number;
  
  @Column({
    name: 'selling_price',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: false
  })
  @Check('positive_selling_price', 'selling_price > 0')
  sellingPrice!: number;
  
  @Column({
    name: 'last_update',
    type: 'timestamp',
    default: () => 'now()'
  })
  lastUpdate!: Date;
  
  constructor(data?: {
    tradingPointId: number;
    productId: number;
    quantity?: number;
    sellingPrice: number;
  }) {
    if (data) {
      this.tradingPointId = data.tradingPointId;
      this.productId = data.productId;
      this.quantity = data.quantity || 0;
      this.sellingPrice = data.sellingPrice;
      this.lastUpdate = new Date();
    }
  }
}