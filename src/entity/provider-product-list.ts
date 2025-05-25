import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

import { Provider } from './provider.js';
import { ProductDirectory } from './product-directory.js';

@Entity({ name: 'providers_product_list' })
export class ProviderProductList {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Provider)
  @JoinColumn({
    name: 'provider_id',
  })
  provider!: Provider;

  @ManyToOne(() => ProductDirectory)
  @JoinColumn({ name: 'product_id' })
  product!: ProductDirectory;

  @Column({
    type: 'numeric',
    precision: 12,
    scale: 2
  })
  price!: number;

  @Column({
    type: 'int',
    default: 1
  })
  minOrderQuantity!: number;

  @Column({
    type: 'boolean',
    default: true
  })
  active!: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'now()'
  })
  lastUpdate!: Date;

  constructor(data?: {
    provider: Provider;
    product: ProductDirectory;
    price: number;
    minOrderQuantity: number;
    active?: boolean;
    lastUpdate?: Date;
  }) {
    if (data) {
      this.provider = data.provider;
      this.product = data.product;
      this.price = data.price;
      this.minOrderQuantity = data.minOrderQuantity ?? 1;
      this.active = data.active ?? false;
      this.lastUpdate = data.lastUpdate
        ? new Date(data.lastUpdate)
        : new Date();
    }
  }
}