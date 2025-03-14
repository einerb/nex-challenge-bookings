import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { BookingResolver } from '../../presentation/graphql/resolvers/booking.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomGqlExceptionFilter } from '../../presentation/graphql/exceptions/custom-gql-exception.filter';
import { RoomPrismaRepository } from '../persistence/RoomPrismaRepository';
import { UserPrismaRepository } from '../persistence/UserPrismaRepository';
import {
  CancelBookingUseCase,
  CreateBookingUseCase,
  GetAllBookingsUseCase,
  GetBookingUseCase,
  UpdateBookingUseCase,
} from '../../application/use-cases/booking';
import { configureContainer } from '../containers/configure-container';
import { BookingPrismaRepository } from '../persistence/BookingPrismaRepository';

@Module({
  imports: [PrismaModule],
  providers: [
    BookingResolver,
    CreateBookingUseCase,
    GetBookingUseCase,
    GetAllBookingsUseCase,
    UpdateBookingUseCase,
    CancelBookingUseCase,
    {
      provide: 'Container',
      useFactory: () => {
        return configureContainer();
      },
    },
    {
      provide: 'BookingRepository',
      useClass: BookingPrismaRepository,
    },
    {
      provide: 'RoomRepository',
      useClass: RoomPrismaRepository,
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
export class BookingModule {}
