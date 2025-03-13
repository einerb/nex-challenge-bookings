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
  ],
})
export class BookingModule {}
