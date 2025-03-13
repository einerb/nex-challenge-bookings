import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Booking } from '../types/booking.type';
import { CreateBookingInput } from '../inputs/create-booking.input';
import {
  CancelBookingUseCase,
  CreateBookingUseCase,
  GetAllBookingsUseCase,
  GetBookingUseCase,
} from 'src/application/use-cases/';
import { RoomRepository } from 'src/domain/repositories/RoomRepository';
import { UserRepository } from 'src/domain/repositories/UserRepository';
import { CreateBookingDTO } from 'src/application/dtos/create-booking.dto';
import { Room, User } from 'src/domain/entities';
import { CustomError } from 'src/domain/exceptions/custom-error';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly getBookingUseCase: GetBookingUseCase,
    private readonly getAllBookingsUseCase: GetAllBookingsUseCase,
    private readonly cancelBookingUseCase: CancelBookingUseCase,
    @Inject('RoomRepository') private readonly roomRepo: RoomRepository,
    @Inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  @Query(() => Booking, { nullable: true })
  async getBooking(@Args('id') id: string) {
    return this.getBookingUseCase.execute(id);
  }

  @Query(() => [Booking])
  async getAllBookings() {
    return this.getAllBookingsUseCase.execute();
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
      input.totalPrice,
      input.isAllInclusive,
      input.guests,
    );

    return await this.createBookingUseCase.execute(createBookingDto);
  }

  @Mutation(() => Boolean)
  async cancelBooking(@Args('id') id: string) {
    return this.cancelBookingUseCase.execute(id);
  }
}
