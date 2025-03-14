import { Container } from './container';
import { BookingPrismaRepository } from '../persistence/BookingPrismaRepository';
import { BookingService } from '../../domain/services/BookingService';
import {
  CancelBookingUseCase,
  CreateBookingUseCase,
  GetAllBookingsUseCase,
  GetBookingUseCase,
} from '../../application/use-cases/booking';
import { PrismaService } from '../prisma/prisma.service';
import { PricingService } from '../../domain/services/PricingService';
import { DiscountService } from '../../domain/services/DiscountService';
import { PricingRulePrismaRepository } from '../persistence/PricingRulePrismaRepository';
import { DiscountRulePrismaRepository } from '../persistence/DiscountRulePrismaRepository';
import { GetAllRoomsUseCase } from '../../application/use-cases/room/GetAllRoomsUseCase';
import { RoomPrismaRepository } from '../persistence/RoomPrismaRepository';
import { UserPrismaRepository } from '../persistence/UserPrismaRepository';
import { GetAllUsersUseCase } from '../../application/use-cases/user/GetAllUsersUseCase';

export function configureContainer(): Container {
  const container = new Container();

  const prismaService = new PrismaService();
  const pricingRepo = new PricingRulePrismaRepository(prismaService);
  const discountRepo = new DiscountRulePrismaRepository(prismaService);
  const pricingService = new PricingService(pricingRepo);
  const discountService = new DiscountService(discountRepo);
  const bookingService = new BookingService(pricingService, discountService);

  container.register('PrismaService', prismaService);
  container.register('PricingRuleRepository', pricingRepo);
  container.register('DiscountRuleRepository', discountRepo);
  container.register('PricingService', pricingService);
  container.register('DiscountService', discountService);
  container.register('BookingService', bookingService);

  container.register(
    'BookingRepository',
    new BookingPrismaRepository(prismaService),
  );
  container.register('RoomRepository', new RoomPrismaRepository(prismaService));
  container.register('UserRepository', new UserPrismaRepository(prismaService));

  container.register(
    'CreateBookingUseCase',
    new CreateBookingUseCase(
      container.resolve('BookingRepository'),
      container.resolve('BookingService'),
    ),
  );
  container.register(
    'GetBookingUseCase',
    new GetBookingUseCase(container.resolve('BookingRepository')),
  );
  container.register(
    'GetAllBookingsUseCase',
    new GetAllBookingsUseCase(container.resolve('BookingRepository')),
  );
  container.register(
    'CancelBookingUseCase',
    new CancelBookingUseCase(container.resolve('BookingRepository')),
  );
  container.register(
    'GetAllRoomsUseCase',
    new GetAllRoomsUseCase(container.resolve('RoomRepository')),
  );
  container.register(
    'GetAllUsersUseCase',
    new GetAllUsersUseCase(container.resolve('UserRepository')),
  );

  return container;
}
