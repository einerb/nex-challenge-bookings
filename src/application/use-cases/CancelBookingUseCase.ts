import { BookingRepository } from 'src/domain/repositories/BookingRepository';

export class CancelBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(id: string): Promise<boolean> {
    const booking = await this.bookingRepo.findById(id);

    if (!booking) {
      throw new Error('Booking not found!');
    }

    await this.bookingRepo.delete(id);

    return true;
  }
}
