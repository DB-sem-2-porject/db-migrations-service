import { AppDataSource } from '../data-source.ts';
import { Customer } from '../entity/customer.ts';

export class CustomerService {
  private repository = AppDataSource.getRepository(Customer);
  
  async createCustomer(data: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  }): Promise<Customer> {
    const customer = this.repository.create(data);
    return this.repository.save(customer);
  }
  
  async deleteCustomer(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}