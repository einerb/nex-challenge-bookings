import { BaseEntity } from './Base';

export class Room extends BaseEntity {
  constructor(
    public readonly type: RoomType,
    public readonly view: RoomView,
    public readonly price: number,
    public readonly capacity: number,
  ) {
    super();
  }
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
