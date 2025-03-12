export class DiscountRule {
  constructor(
    public readonly id: string,
    public minNights: number,
    public maxNights: number | null,
    public discount: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  appliesTo(nights: number): boolean {
    return (
      nights >= this.minNights &&
      (this.maxNights === null || nights <= this.maxNights)
    );
  }

  calculateDiscount(nights: number): number {
    return this.appliesTo(nights) ? this.discount * nights : 0;
  }
}
