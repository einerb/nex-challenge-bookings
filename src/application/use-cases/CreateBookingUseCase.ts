import { Booking, BookingStatus } from 'src/domain/entities';
import { BookingRepository } from 'src/domain/repositories/BookingRepository';
import { CreateBookingDTO } from '../dtos/create-booking.dto';

export class CreateBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(input: CreateBookingDTO): Promise<Booking> {
    const booking = new Booking(
      input.room,
      input.guest,
      input.startDate,
      input.endDate,
      input.totalPrice,
      input.isAllInclusive,
      input.guests,
      BookingStatus.PENDING,
    );

    await this.bookingRepo.save(booking);

    return booking;
  }
}
