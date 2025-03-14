import { Booking } from '../entities/Booking';

export interface BookingRepository {
  findById(id: string): Promise<Booking | null>;
  findAll(): Promise<Booking[]>;
  findOverlappingBookings(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  delete(id: string): Promise<void>;
}
