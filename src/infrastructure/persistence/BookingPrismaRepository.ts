import {
  Booking as PrismaBooking,
  Room as PrismaRoom,
  User as PrismaUser,
} from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { BookingRepository } from '../../domain/repositories/BookingRepository';
import { Booking, BookingStatus } from '../../domain/entities/Booking';
import { Room, User } from '../../domain/entities/';

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

  async findOverlappingBookings(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Booking[]> {
    const overlappingBookings = await this.prisma.booking.findMany({
      where: {
        roomId,
        status: BookingStatus.CONFIRMED,
        deletedAt: null,
        OR: [
          {
            startDate: { lt: endDate },
            endDate: { gt: startDate },
          },
        ],
      },
      include: { room: true, guest: true },
    });

    return overlappingBookings.map((booking) => this.mapToDomain(booking));
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
      data: { status: BookingStatus.CANCELLED },
    });
  }

  private mapToDomain(
    booking: PrismaBooking & { room: PrismaRoom; guest: PrismaUser },
  ): Booking {
    return new Booking(
      booking.id,
      booking.room as Room,
      booking.guest as User,
      booking.startDate,
      booking.endDate,
      booking.totalPrice,
      booking.isAllInclusive,
      booking.guests,
      booking.status as BookingStatus,
      booking.numberDays,
      booking.numberNights,
      booking.basePrice,
      booking.totalWeekendIncrement,
      booking.totalDiscount,
      booking.totalAllInclusive,
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
      numberDays: booking.numberDays ?? 0,
      numberNights: booking.numberNights ?? 0,
      basePrice: booking.basePrice ?? 0,
      totalWeekendIncrement: booking.totalWeekendIncrement ?? 0,
      totalDiscount: booking.totalDiscount ?? 0,
      totalAllInclusive: booking.totalAllInclusive ?? 0,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      deletedAt: booking.deletedAt,
    };
  }
}
