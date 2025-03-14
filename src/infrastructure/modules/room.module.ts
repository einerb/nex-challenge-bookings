import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from '../prisma/prisma.module';
import { RoomResolver } from '../../presentation/graphql/resolvers/room.resolver';
import { GetAllRoomsUseCase } from '../../application/use-cases/room/GetAllRoomsUseCase';
import { configureContainer } from '../containers/configure-container';
import { RoomPrismaRepository } from '../persistence/RoomPrismaRepository';
import { CustomGqlExceptionFilter } from '../../presentation/graphql/exceptions/custom-gql-exception.filter';

@Module({
  imports: [PrismaModule],
  providers: [
    RoomResolver,
    GetAllRoomsUseCase,
    {
      provide: 'Container',
      useFactory: () => {
        return configureContainer();
      },
    },
    {
      provide: 'RoomRepository',
      useClass: RoomPrismaRepository,
    },
    {
      provide: APP_FILTER,
      useClass: CustomGqlExceptionFilter,
    },
  ],
})
export class RoomModule {}
