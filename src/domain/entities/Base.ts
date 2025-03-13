export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null = null;

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || this.createdAt;
    this.deletedAt = null;
  }

  updateTimestamps() {
    this.updatedAt = new Date();
  }

  softDelete() {
    this.deletedAt = new Date();
  }
}
