import { Booking } from '../../../domain/entities';
import { BookingRepository } from '../../../domain/repositories/BookingRepository';

export class GetAllBookingsUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async execute(): Promise<Booking[]> {
    return this.bookingRepo.findAll();
  }
}
