import { Injectable } from '@nestjs/common';
import { Room as PrismaRoom } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { RoomRepository } from '../../domain/repositories/RoomRepository';
import { Room, RoomType, RoomView } from '../../domain/entities/Room';

@Injectable()
export class RoomPrismaRepository implements RoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAvailable(
    checkIn: Date,
    checkOut: Date,
    guests: number,
    type: RoomType = RoomType.SINGLE,
    view: RoomView = RoomView.INTERIOR,
  ): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany({
      where: {
        bookings: {
          none: {
            OR: [{ startDate: { lte: checkOut }, endDate: { gte: checkIn } }],
          },
        },
        capacity: { gte: guests },
        type,
        view,
      },
      include: { bookings: true },
    });

    return rooms.map((room) => this.mapToDomain(room));
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.prisma.room.findUnique({ where: { id } });

    return room ? this.mapToDomain(room) : null;
  }

  private mapToDomain(room: PrismaRoom): Room {
    return new Room(
      room.id,
      room.name,
      room.type as RoomType,
      room.view as RoomView,
      room.price,
      room.capacity,
    );
  }
}
