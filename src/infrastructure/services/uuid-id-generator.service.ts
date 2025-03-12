import { v4 as uuidv4 } from 'uuid';

import { IdGenerator } from '../../domain/interfaces/id-generator.interface';

export class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}
