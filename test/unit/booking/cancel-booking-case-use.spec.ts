import { CancelBookingUseCase } from '../../../src/application/use-cases';

import {
  Booking,
  BookingStatus,
  Room,
  RoomType,
  RoomView,
  User,
} from '../../../src/domain/entities';
import { BookingRepository } from '../../../src/domain/repositories/BookingRepository';
import { CustomError } from '../../../src/domain/exceptions/custom-error';

describe('CancelBookingUseCase', () => {
  let cancelBookingUseCase: CancelBookingUseCase;
  let bookingRepo: jest.Mocked<BookingRepository>;

  beforeEach(() => {
    bookingRepo = {
      findById: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<BookingRepository>;

    cancelBookingUseCase = new CancelBookingUseCase(bookingRepo);
  });

  it('debe cancelar una reserva si existe', async () => {
    const mockBooking = new Booking(
      '4ae3306f-b749-4bce-bf3a-3495fd6b2249',
      new Room('r1', 'Suite', RoomType.PRESIDENTIAL, RoomView.OUTSIDE, 500, 2),
      new User('u1', 'John Doe', 'john@example.com'),
      new Date('2025-05-01'),
      new Date('2025-05-05'),
      2000,
      false,
      2,
      BookingStatus.CONFIRMED,
    );

    bookingRepo.findById.mockResolvedValue(mockBooking);
    bookingRepo.delete.mockResolvedValue(undefined);

    const result = await cancelBookingUseCase.execute(
      '4ae3306f-b749-4bce-bf3a-3495fd6b2249',
    );

    expect(bookingRepo.findById).toHaveBeenCalledWith(
      '4ae3306f-b749-4bce-bf3a-3495fd6b2249',
    );
    expect(bookingRepo.delete).toHaveBeenCalledWith(
      '4ae3306f-b749-4bce-bf3a-3495fd6b2249',
    );
    expect(result).toBe(true);
  });

  it('debe lanzar un error si la reserva no existe', async () => {
    bookingRepo.findById.mockResolvedValue(null);

    await expect(
      cancelBookingUseCase.execute('4ae3306f-b749-4bce-bf3a-3495fd6b2249'),
    ).rejects.toThrow(CustomError);
    await expect(
      cancelBookingUseCase.execute('4ae3306f-b749-4bce-bf3a-3495fd6b2249'),
    ).rejects.toThrow('Booking not found!');
    await expect(
      cancelBookingUseCase.execute('4ae3306f-b749-4bce-bf3a-3495fd6b2249'),
    ).rejects.toMatchObject({
      message: 'Booking not found!',
      code: 'BOOKING_NOT_FOUND',
      statusCode: 404,
    });

    expect(bookingRepo.delete).not.toHaveBeenCalled();
  });
});
