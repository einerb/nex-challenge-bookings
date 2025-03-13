import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

import { RoomType, RoomView } from '../enums/graphql.enums';

@ObjectType()
export class Room {
  @Field()
  id!: string;

  @Field(() => RoomType)
  type!: RoomType;

  @Field(() => RoomView)
  view!: RoomView;

  @Field(() => Int)
  capacity!: number;

  @Field(() => Float)
  price!: number;
}
