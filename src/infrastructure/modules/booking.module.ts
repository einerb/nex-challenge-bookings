import { Module } from '@nestjs/common';

import {
  CreateBookingUseCase,
  GetBookingUseCase,
  GetAllBookingsUseCase,
  UpdateBookingUseCase,
  CancelBookingUseCase,
} from 'src/application/use-cases';
import { BookingResolver } from 'src/presentation/graphql/resolvers/booking.resolver';
import { BookingPrismaRepository } from '../persistence/BookingPrismaRepository';
import { RoomPrismaRepository } from '../persistence/RoomPrismaRepository';
import { UserPrismaRepository } from '../persistence/UserPrismaRepository';
import { PrismaModule } from '../prisma/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomGqlExceptionFilter } from 'src/presentation/graphql/exceptions/custom-gql-exception.filter';

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
