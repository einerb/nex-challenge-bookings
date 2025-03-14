import { Room, User } from 'src/domain/entities';

export class CreateBookingDTO {
  constructor(
    public readonly room: Room,
    public readonly guest: User,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly isAllInclusive: boolean,
    public readonly guests: number,
  ) {}
}
