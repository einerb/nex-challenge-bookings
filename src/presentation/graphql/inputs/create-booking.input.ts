import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookingInput {
  @Field()
  guestId!: string;

  @Field()
  roomId!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field()
  guests!: number;

  @Field()
  totalPrice!: number;

  @Field()
  isAllInclusive!: boolean;
}
