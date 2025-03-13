import { Booking } from 'src/domain/entities';
import { BookingRepository } from 'src/domain/repositories/BookingRepository';

export class GetAllBookingsUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(): Promise<Booking[]> {
    return this.bookingRepo.findAll();
  }
}
