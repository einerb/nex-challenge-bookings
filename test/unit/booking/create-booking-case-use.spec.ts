import { CreateBookingUseCase } from '../../../src/application/use-cases/booking';
import { Booking, BookingStatus } from '../../../src/domain/entities';
import { CustomError } from '../../../src/domain/exceptions/custom-error';
import { BookingRepository } from '../../../src/domain/repositories/BookingRepository';
import { BookingService } from '../../../src/domain/services/BookingService';

// Mocks
const mockBookingRepo = {
  save: jest.fn(),
  findOverlappingBookings: jest.fn().mockResolvedValue([]),
};
const mockBookingService = {
  calculateTotalPrice: jest.fn().mockResolvedValue({
    totalPrice: 1000,
    days: 2,
    nights: 2,
    basePrice: 800,
    weekendIncrement: 200,
    discountAmount: 0,
    allInclusiveFee: 0,
  }),
};

describe('CreateBookingUseCase', () => {
  let createBookingUseCase;

  beforeEach(() => {
    createBookingUseCase = new CreateBookingUseCase(
      mockBookingRepo as unknown as BookingRepository,
      mockBookingService as unknown as BookingService,
    );
  });

  it('should create a booking successfully', async () => {
    const input = {
      room: { id: 'room-1', type: 'Deluxe', capacity: 2 },
      guest: { id: 'guest-1', name: 'John Doe' },
      guests: 2,
      startDate: new Date('2025-05-10'),
      endDate: new Date('2025-05-12'),
      isAllInclusive: false,
    };

    const booking = await createBookingUseCase.execute(input);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.status).toBe(BookingStatus.CONFIRMED);
    expect(mockBookingRepo.save).toHaveBeenCalledWith(booking);
  });

  it('should throw an error for past booking dates', async () => {
    const input = {
      ...{},
      startDate: new Date('2020-01-01'),
      endDate: new Date('2020-01-05'),
    };

    await expect(createBookingUseCase.execute(input)).rejects.toThrow(
      CustomError,
    );
  });

  it('should throw an error if room capacity is exceeded', async () => {
    const input = {
      room: { id: 'room-1', type: 'SINGLE', capacity: 2 },
      guests: 4,
      startDate: new Date('2025-05-10'),
      endDate: new Date('2025-05-12'),
    };

    await expect(createBookingUseCase.execute(input)).rejects.toThrow(
      CustomError,
    );
  });

  it('should throw an error if there is an overlapping booking', async () => {
    mockBookingRepo.findOverlappingBookings.mockResolvedValue([{}]);
    const input = {
      room: { id: 'room-1', type: 'Deluxe', capacity: 2 },
      guests: 2,
      startDate: new Date('2025-05-10'),
      endDate: new Date('2025-05-12'),
    };

    await expect(createBookingUseCase.execute(input)).rejects.toThrow(
      CustomError,
    );
  });
});
