export class Room {
  constructor(
    public readonly id: string,
    public type: RoomType,
    public view: RoomView,
    public price: number,
    public capacity: number,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt?: Date | null,
  ) {}
}

export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  PRESIDENTIAL = 'PRESIDENTIAL',
}

export enum RoomView {
  OUTSIDE = 'OUTSIDE',
  INTERIOR = 'INTERIOR',
}
