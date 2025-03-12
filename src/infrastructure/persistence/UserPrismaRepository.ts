import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from 'src/domain/repositories/UserRepository';
import { User } from 'src/domain/entities';

interface PrismaUser {
  name: string;
  email: string;
}

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = (await this.prisma.user.findUnique({
      where: { id },
      include: { bookings: true },
    })) as PrismaUser;

    return user ? this.mapToDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = (await this.prisma.user.findUnique({
      where: { email },
      include: { bookings: true },
    })) as PrismaUser;

    return user ? this.mapToDomain(user) : null;
  }

  private mapToDomain(user: PrismaUser): User {
    return new User(user.name, user.email);
  }
}
