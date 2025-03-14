import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { GetAllRoomsUseCase } from '../../../application/use-cases/room/GetAllRoomsUseCase';
import { Container } from '../../../infrastructure/containers/container';
import { FindAvailableInput } from '../inputs/find-available.input';
import { Room } from '../types/room.type';

@Resolver('Room')
export class RoomResolver {
  constructor(@Inject('Container') private readonly container: Container) {}

  @Query(() => [Room])
  async getAllRooms(@Args('input') input: FindAvailableInput) {
    const getAllRoomsUseCase =
      this.container.resolve<GetAllRoomsUseCase>('GetAllRoomsUseCase');

    return await getAllRoomsUseCase.execute(
      input.checkIn,
      input.checkOut,
      input.guest,
      input.type,
      input.view,
    );
  }
}
