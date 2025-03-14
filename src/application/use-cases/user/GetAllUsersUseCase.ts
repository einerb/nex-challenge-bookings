import { User } from 'src/domain/entities';
import { UserRepository } from 'src/domain/repositories/UserRepository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
