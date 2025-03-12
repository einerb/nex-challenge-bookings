import { Booking } from '../entities/Booking';

export interface BookingRepository {
  findById(id: string): Promise<Booking | null>;
  findAll(): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  delete(id: string): Promise<void>;
}
