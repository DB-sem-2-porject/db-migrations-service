import { AppDataSource } from '../data-source.ts';
import { Employee } from '../entity/employee.ts';

export class EmployeeService {
  private repository = AppDataSource.getRepository(Employee);
  
  async createEmployee(data: {
    firstName: string;
    lastName: string;
    position: string;
    email?: string;
    phone?: string;
  }): Promise<Employee> {
    const employee = this.repository.create(data);
    return this.repository.save(employee);
  }
  
  async deleteEmployee(data: {
    id: number,
  }): Promise<void> {
    await this.repository.delete(id);
  }
}