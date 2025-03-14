import { Booking, BookingStatus } from '../../../domain/entities';
import { BookingRepository } from '../../../domain/repositories/BookingRepository';
import { CreateBookingDTO } from '../../dtos/Create-booking.dto';
import { CustomError } from '../../../domain/exceptions/custom-error';
import { BookingService } from '../../../domain/services/BookingService';

export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepo: BookingRepository,
    private readonly bookingService: BookingService,
  ) {}

  async execute(input: CreateBookingDTO): Promise<Booking> {
    const { room, guest, guests, startDate, endDate, isAllInclusive } = input;

    this.validateDates(startDate);

    await this.validateOverlappingBookings(room.id, startDate, endDate);

    if (guests > room.capacity) {
      throw new CustomError(
        'Room capacity is less than the actual amount!',
        'ROOM_CAPACITY_EXCEEDED',
        400,
      );
    }

    const priceDetails = await this.bookingService.calculateTotalPrice(
      room.type,
      startDate,
      endDate,
      guests,
      isAllInclusive,
    );

    const booking = new Booking(
      crypto.randomUUID(),
      room,
      guest,
      startDate,
      endDate,
      priceDetails.totalPrice,
      isAllInclusive,
      guests,
      BookingStatus.CONFIRMED,
      priceDetails.days,
      priceDetails.nights,
      priceDetails.basePrice,
      priceDetails.weekendIncrement,
      priceDetails.discountAmount,
      priceDetails.allInclusiveFee,
    );

    if (!booking.validateDates()) {
      throw new CustomError(
        "The booking dates aren't valid!",
        'BOOKING_DATE_INVALID',
        400,
      );
    }

    await this.bookingRepo.save(booking);

    return booking;
  }

  private validateDates(startDate: Date): void {
    const currentDate = new Date();

    const startDateFormat = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      0,
      0,
      0,
    );

    const currentDateFormat = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
    );

    if (startDateFormat.getTime() < currentDateFormat.getTime()) {
      throw new CustomError(
        'Bookings cannot be created on past dates!',
        'INVALID_DATE',
        400,
      );
    }
  }

  private async validateOverlappingBookings(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    const overlappingBookings = await this.bookingRepo.findOverlappingBookings(
      roomId,
      startDate,
      endDate,
    );

    if (overlappingBookings.length > 0) {
      throw new CustomError(
        'There is already a confirmed reservation for this room on the selected dates!',
        'OVERLAPPING_BOOKING',
        400,
      );
    }
  }
}
