import { Container } from './container';
import { BookingPrismaRepository } from '../persistence/BookingPrismaRepository';
import { BookingService } from '../../domain/services/BookingService';
import {
  CancelBookingUseCase,
  CreateBookingUseCase,
  GetAllBookingsUseCase,
  GetBookingUseCase,
} from '../../application/use-cases';
import { PrismaService } from '../prisma/prisma.service';
import { PricingService } from '../../domain/services/PricingService';
import { DiscountService } from '../../domain/services/DiscountService';
import { PricingRulePrismaRepository } from '../persistence/PricingRulePrismaRepository';
import { DiscountRulePrismaRepository } from '../persistence/DiscountRulePrismaRepository';

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

  return container;
}
