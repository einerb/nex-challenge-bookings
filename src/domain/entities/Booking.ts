import { BaseEntity } from './Base';
import { Room } from './Room';
import { User } from './User';

export class Booking extends BaseEntity {
  constructor(
    public readonly room: Room,
    public readonly guest: User,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly totalPrice: number,
    public readonly isAllInclusive: boolean,
    public readonly guests: number,
    public readonly status: BookingStatus,
  ) {
    super();
  }

  validateDates(): boolean {
    return this.startDate < this.endDate;
  }
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
