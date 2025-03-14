import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from '../prisma/prisma.module';
import { UserResolver } from '../../presentation/graphql/resolvers/user.resolver';
import { GetAllUsersUseCase } from '../../application/use-cases/user/GetAllUsersUseCase';
import { configureContainer } from '../containers/configure-container';
import { UserPrismaRepository } from '../persistence/UserPrismaRepository';
import { CustomGqlExceptionFilter } from '../../presentation/graphql/exceptions/custom-gql-exception.filter';

@Module({
  imports: [PrismaModule],
  providers: [
    UserResolver,
    GetAllUsersUseCase,
    {
      provide: 'Container',
      useFactory: () => {
        return configureContainer();
      },
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: APP_FILTER,
      useClass: CustomGqlExceptionFilter,
    },
  ],
})
export class UserModule {}
