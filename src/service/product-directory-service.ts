import { AppDataSource } from '../data-source.ts';
import { ProductDirectory } from '../entity/product-directory.ts';
import { MeasurementType } from '../entity/enum/measurement_type.js';
import { ProductCategory } from '../entity/enum/product_category.js';

export class ProductDirectoryService {
  private repository = AppDataSource.getRepository(ProductDirectory);
  
  async createProduct(data: {
    name: string;
    description?: string;
    category?: ProductCategory;
    measurement: MeasurementType;
    createdAt?: Date;
  }): Promise<ProductDirectory> {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }
  
  async deleteProduct(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}