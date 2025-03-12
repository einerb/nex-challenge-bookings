export class Booking {
  constructor(
    public readonly id: string,
    public roomId: string,
    public guestId: string,
    public startDate: Date,
    public endDate: Date,
    public totalPrice: number,
    public isAllInclusive: boolean,
    public guests: number,
    public status: BookingStatus,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt?: Date | null,
  ) {}

  validateDates(): boolean {
    return this.startDate < this.endDate;
  }
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
