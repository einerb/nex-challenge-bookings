import { RoomType } from '../entities';
import { BookingPriceDetails } from '../interfaces/BookingPriceDetails';
import { DiscountService } from './DiscountService';
import { PricingService } from './PricingService';

export class BookingService {
  constructor(
    private readonly pricingService: PricingService,
    private readonly discountService: DiscountService,
  ) {}

  async calculateTotalPrice(
    roomType: RoomType,
    startDate: Date,
    endDate: Date,
    guests: number,
    isAllInclusive: boolean,
  ): Promise<BookingPriceDetails> {
    const nights = this.calculateNights(startDate, endDate);
    const days = this.calculateDays(startDate, endDate);
    const weekendNights = this.calculateWeekendNights(startDate, endDate);

    const basePricePerNight = await this.pricingService.getBasePrice(roomType);

    const weekdayNights = nights - weekendNights;
    const basePriceTotal = basePricePerNight * weekdayNights;

    const weekendIncrementTotal = basePricePerNight * 0.2 * weekendNights;

    const priceBeforeDiscount =
      basePriceTotal +
      basePricePerNight * weekendNights +
      weekendIncrementTotal;

    const totalPrice = await this.discountService.applyDiscount(
      nights,
      priceBeforeDiscount,
    );

    const allInclusiveFee = isAllInclusive ? 25000 * guests * nights : 0;

    return {
      totalPrice: totalPrice + allInclusiveFee,
      basePrice: basePriceTotal,
      weekendIncrement: weekendIncrementTotal,
      discountAmount: priceBeforeDiscount - totalPrice,
      allInclusiveFee,
      nights,
      days,
      weekendNights,
    };
  }

  private calculateDays(startDate: Date, endDate: Date): number {
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  private calculateNights(startDate: Date, endDate: Date): number {
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private calculateWeekendNights(startDate: Date, endDate: Date): number {
    let weekendNights = 0;
    const currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek === 5 || dayOfWeek === 6) {
        weekendNights++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekendNights;
  }
}
