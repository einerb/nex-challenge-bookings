export interface BookingPriceDetails {
  totalPrice: number;
  basePrice: number;
  weekendIncrement: number;
  discountAmount: number;
  allInclusiveFee: number;
  days: number;
  nights: number;
  weekendNights: number;
}
