import { BaseEntity } from './Base';

export class User extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {
    super(id);
  }
}
