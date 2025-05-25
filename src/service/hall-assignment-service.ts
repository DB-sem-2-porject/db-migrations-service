import { AppDataSource } from '../data-source.ts';
import { HallAssignment } from '../entity/hall-assignment.ts';

export class HallAssignmentService {
  private repository = AppDataSource.getRepository(HallAssignment);
  
  async createAssignment(data: {
    hallId: number;
    employeeId: number;
    startDate: Date;
    endDate?: Date;
  }): Promise<HallAssignment> {
    const assignment = this.repository.create(data);
    return this.repository.save(assignment);
  }
  
  async deleteAssignment(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}