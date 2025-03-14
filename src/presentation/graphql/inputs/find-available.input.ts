import { Field, InputType } from '@nestjs/graphql';

import { RoomType, RoomView } from '../enums/graphql.enums';

@InputType()
export class FindAvailableInput {
  @Field()
  checkIn!: Date;

  @Field()
  checkOut!: Date;

  @Field()
  guest!: number;

  @Field(() => RoomType, { nullable: true })
  type?: RoomType;

  @Field(() => RoomView, { nullable: true })
  view?: RoomView;
}
