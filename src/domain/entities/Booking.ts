import { BaseEntity } from './Base';
import { Room } from './Room';
import { User } from './User';

export class Booking extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly room: Room,
    public readonly guest: User,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly totalPrice: number,
    public readonly isAllInclusive: boolean,
    public readonly guests: number,
    public readonly status: BookingStatus,

    public readonly numberDays?: number,
    public readonly numberNights?: number,
    public readonly basePrice?: number,
    public readonly totalWeekendIncrement?: number,
    public readonly totalDiscount?: number,
    public readonly totalAllInclusive?: number,
  ) {
    super(id);
  }

  validateDates(): boolean {
    return this.startDate < this.endDate;
  }
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
