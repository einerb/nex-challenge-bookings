import { Room, RoomType, RoomView } from '../../../domain/entities';
import { RoomRepository } from '../../../domain/repositories/RoomRepository';

export class GetAllRoomsUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(
    checkIn: Date,
    checkOut: Date,
    guest: number,
    type: RoomType = RoomType.SINGLE,
    view: RoomView = RoomView.INTERIOR,
  ): Promise<Room[]> {
    return await this.roomRepo.findAvailable(
      checkIn,
      checkOut,
      guest,
      type,
      view,
    );
  }
}
