import { Room, RoomType, RoomView } from '../entities/Room';

export interface RoomRepository {
  findAvailable(
    checkIn: Date,
    checkOut: Date,
    guests: number,
    type?: RoomType,
    view?: RoomView,
  ): Promise<Room[]>;
  findById(id: string): Promise<Room | null>;
}
