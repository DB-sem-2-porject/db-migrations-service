import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

import { PRODUCT_CATEGORY_ENUM_NAME, ProductCategory } from './enum/product_category.js';
import { MEASUREMENT_TYPE_ENUM_NAME, MeasurementType } from './enum/measurement_type.js';

@Entity({ name: 'product_directory' })
export class ProductDirectory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true })
  description?: string;

  @Column({
    name: 'category',
    type: 'enum',
    enum: ProductCategory,
    enumName: PRODUCT_CATEGORY_ENUM_NAME,
  })
  category!: ProductCategory;

  @Column({
    name: 'measurement',
    type: 'enum',
    enum: MeasurementType,
    enumName: MEASUREMENT_TYPE_ENUM_NAME,
  })
  measurement!: MeasurementType;

  @Column({
    name: 'created_at',
    type: 'date',
    default: () => 'now()'
  })
  createdAt!: Date;

  constructor(data?: {
    name: string;
    description?: string;
    category?: ProductCategory;
    measurement: MeasurementType;
    createdAt?: Date;
  }) {
    if (data) {
      this.name = data.name;
      this.name = data.name;
      this.description = data.description ?? '';
      this.category = data.category ?? ProductCategory.None;
      this.measurement = data.measurement;
      this.createdAt = data.createdAt
        ? new Date(data.createdAt)
        : new Date();
    }
  }
}