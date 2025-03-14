import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities';

interface PrismaUser {
  id: string;
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

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: { bookings: true },
    });

    return users.map((user) => this.mapToDomain(user));
  }

  private mapToDomain(user: PrismaUser): User {
    return new User(user.id, user.name, user.email);
  }
}
