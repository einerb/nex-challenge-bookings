import { CustomError } from 'src/domain/exceptions/custom-error';
import { BookingRepository } from 'src/domain/repositories/BookingRepository';

export class CancelBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(id: string): Promise<boolean> {
    const booking = await this.bookingRepo.findById(id);

    if (!booking) {
      throw new CustomError('Booking not found!', 'BOOKING_NOT_FOUND', 404);
    }

    await this.bookingRepo.delete(id);

    return true;
  }
}
