import { Booking } from '../../domain/entities';
import { BookingRepository } from '../../domain/repositories/BookingRepository';

export class GetBookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(id: string): Promise<Booking | null> {
    return this.bookingRepo.findById(id);
  }
}
