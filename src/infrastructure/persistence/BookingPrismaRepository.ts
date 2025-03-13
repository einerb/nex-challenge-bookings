import {
  Booking as PrismaBooking,
  Room as PrismaRoom,
  User as PrismaUser,
} from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { BookingRepository } from 'src/domain/repositories/BookingRepository';
import { Booking, BookingStatus } from 'src/domain/entities/Booking';
import { Room, User } from 'src/domain/entities/';

@Injectable()
export class BookingPrismaRepository implements BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Booking | null> {
    const booking = await this.prisma.booking.findUnique({
      where: { id, deletedAt: null },
      include: { room: true, guest: true },
    });

    return booking ? this.mapToDomain(booking) : null;
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: { deletedAt: null },
      include: { room: true, guest: true },
    });

    return bookings.map((booking) => this.mapToDomain(booking));
  }

  async save(booking: Booking): Promise<void> {
    await this.prisma.booking.create({ data: this.mapToPrisma(booking) });
  }

  async update(booking: Booking): Promise<void> {
    await this.prisma.booking.update({
      where: { id: booking.id },
      data: this.mapToPrisma(booking),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.booking.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private mapToDomain(
    booking: PrismaBooking & { room: PrismaRoom; guest: PrismaUser },
  ): Booking {
    return new Booking(
      booking.room as Room,
      booking.guest as User,
      booking.startDate,
      booking.endDate,
      booking.totalPrice,
      booking.isAllInclusive,
      booking.guests,
      booking.status as BookingStatus,
    );
  }

  private mapToPrisma(booking: Booking): PrismaBooking {
    return {
      id: booking.id,
      roomId: booking.room.id,
      guestId: booking.guest.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      isAllInclusive: booking.isAllInclusive,
      guests: booking.guests,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      deletedAt: booking.deletedAt,
    };
  }
}
