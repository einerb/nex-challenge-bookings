import { Booking } from '../../domain/entities';
import { BookingRepository } from '../../domain/repositories/BookingRepository';
import { UpdateBookingDTO } from '../dtos/UpdateBookingDto';
import { CustomError } from '../../domain/exceptions/custom-error';

export class UpdateBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(input: UpdateBookingDTO): Promise<Booking> {
    const existingBooking = await this.bookingRepo.findById(input.id);

    if (!existingBooking) {
      throw new CustomError('Booking not found!', 'BOOKING_NOT_FOUND', 404);
    }

    const updatedBooking = new Booking(
      input.id,
      input.room ?? existingBooking.room,
      input.guest ?? existingBooking.guest,
      input.startDate ?? existingBooking.startDate,
      input.endDate ?? existingBooking.endDate,
      input.totalPrice ?? existingBooking.totalPrice,
      input.isAllInclusive ?? existingBooking.isAllInclusive,
      input.guests ?? existingBooking.guests,
      existingBooking.status,
    );

    await this.bookingRepo.update(updatedBooking);

    return updatedBooking;
  }
}
