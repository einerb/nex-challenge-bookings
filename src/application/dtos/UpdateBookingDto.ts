import { Room, User } from 'src/domain/entities';

export class UpdateBookingDTO {
  constructor(
    public readonly id: string,
    public readonly room?: Room,
    public readonly guest?: User,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly totalPrice?: number,
    public readonly isAllInclusive?: boolean,
    public readonly guests?: number,
  ) {}
}
