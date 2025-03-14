import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { GetAllUsersUseCase } from 'src/application/use-cases/user/GetAllUsersUseCase';
import { Container } from 'src/infrastructure/containers/container';
import { User } from '../types/user.type';

@Resolver('User')
export class UserResolver {
  constructor(@Inject('Container') private readonly container: Container) {}

  @Query(() => [User])
  async getAllUsers() {
    const getAllUsersUseCase =
      this.container.resolve<GetAllUsersUseCase>('GetAllUsersUseCase');

    return await getAllUsersUseCase.execute();
  }
}
