import { AppDataSource } from '../data-source.ts';
import { Salary } from '../entity/salary.ts';

export class SalaryService {
  private repository = AppDataSource.getRepository(Salary);
  
  async createSalary(data: {
    employeeId: number;
    amount: number;
    startDate: Date;
    endDate?: Date;
  }): Promise<Salary> {
    const salary = this.repository.create(data);
    return this.repository.save(salary);
  }
  
  async deleteSalary(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}