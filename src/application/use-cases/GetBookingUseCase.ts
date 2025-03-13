import { Booking } from 'src/domain/entities';
import { BookingRepository } from 'src/domain/repositories/BookingRepository';

export class GetBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(id: string): Promise<Booking | null> {
    return this.bookingRepo.findById(id);
  }
}
