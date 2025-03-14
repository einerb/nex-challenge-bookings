import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Booking } from '../types/booking.type';
import { CreateBookingInput } from '../inputs/create-booking.input';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CreateBookingDTO } from '../../../application/dtos/Create-booking.dto';
import { Room, User } from '../../../domain/entities';
import { CustomError } from '../../../domain/exceptions/custom-error';
import { Container } from '../../../infrastructure/containers/container';
import {
  CancelBookingUseCase,
  CreateBookingUseCase,
  GetAllBookingsUseCase,
  GetBookingUseCase,
} from '../../../application/use-cases';

@Resolver('Booking')
export class BookingResolver {
  constructor(
    @Inject('Container') private readonly container: Container,
    @Inject('RoomRepository') private readonly roomRepo: RoomRepository,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  @Query(() => Booking, { nullable: true })
  async getBooking(@Args('id') id: string) {
    const getBookingUseCase =
      this.container.resolve<GetBookingUseCase>('GetBookingUseCase');

    return await getBookingUseCase.execute(id);
  }

  @Query(() => [Booking])
  async getAllBookings() {
    const getAllBookingsUseCase = this.container.resolve<GetAllBookingsUseCase>(
      'GetAllBookingsUseCase',
    );

    return await getAllBookingsUseCase.execute();
  }

  @Mutation(() => Booking)
  async createBooking(@Args('input') input: CreateBookingInput) {
    const room: Room | null = await this.roomRepo.findById(input.roomId);
    const guest: User | null = await this.userRepo.findById(input.guestId);

    if (!room) {
      throw new CustomError('Room not found!', 'ROOM_NOT_FOUND', 404);
    }

    if (!guest) {
      throw new CustomError('Guest not found!', 'GUEST_NOT_FOUND', 404);
    }

    const createBookingDto = new CreateBookingDTO(
      room,
      guest,
      input.startDate,
      input.endDate,
      input.isAllInclusive,
      input.guests,
    );

    const createBookingUseCase = this.container.resolve<CreateBookingUseCase>(
      'CreateBookingUseCase',
    );
    return await createBookingUseCase.execute(createBookingDto);
  }

  @Mutation(() => Boolean)
  async cancelBooking(@Args('id') id: string) {
    const cancelBookingUseCase = this.container.resolve<CancelBookingUseCase>(
      'CancelBookingUseCase',
    );

    return await cancelBookingUseCase.execute(id);
  }
}
