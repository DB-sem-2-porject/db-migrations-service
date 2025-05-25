import { AppDataSource } from '../data-source.ts';
import { User } from '../entity/user.ts';

export class UserService {
  private repository = AppDataSource.getRepository(User);
  
  async createUser(data: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<User> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
  
  async deleteUser(data: { id: number }): Promise<void> {
    await this.repository.delete(data.id);
  }
}