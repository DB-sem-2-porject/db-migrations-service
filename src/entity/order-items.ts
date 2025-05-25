import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from 'typeorm';
import 'reflect-metadata';
import { Order } from './order.ts';
import { ProductDirectory } from './product-directory.ts';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ name: 'order_id', type: 'int', nullable: false })
  orderId!: number;
  
  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order!: Order;
  
  @Column({ name: 'product_id', type: 'int', nullable: false })
  productId!: number;
  
  @ManyToOne(() => ProductDirectory)
  @JoinColumn({ name: 'product_id' })
  product!: ProductDirectory;
  
  @Column({ type: 'int', nullable: false })
  @Check('positive_quantity', 'quantity > 0')
  quantity!: number;
  
  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: false
  })
  @Check('positive_price', 'price > 0')
  price!: number;
  
  constructor(data?: {
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
  }) {
    if (data) {
      this.orderId = data.orderId;
      this.productId = data.productId;
      this.quantity = data.quantity;
      this.price = data.price;
    }
  }
}