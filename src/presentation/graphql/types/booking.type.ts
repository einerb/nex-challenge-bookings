import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

import { Room } from './room.type';
import { User } from './user.type';
import { BookingStatus } from '../enums/graphql.enums';

@ObjectType()
export class Booking {
  @Field()
  id!: string;

  @Field(() => Room)
  room!: Room;

  @Field(() => User)
  guest!: User;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field(() => Int)
  guests!: number;

  @Field()
  isAllInclusive!: boolean;

  @Field(() => Float)
  totalPrice!: number;

  @Field(() => BookingStatus)
  status!: BookingStatus;
}
