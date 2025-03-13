import { registerEnumType } from '@nestjs/graphql';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
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

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
});
registerEnumType(RoomType, { name: 'RoomType' });
registerEnumType(RoomView, { name: 'RoomView' });
