import { UuidIdGenerator } from 'src/infrastructure/services/uuid-id-generator.service';
import { IdGenerator } from '../interfaces/id-generator.interface';

export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null = null;

  constructor(
    idGenerator: IdGenerator = new UuidIdGenerator(),
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = idGenerator.generate();
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
