import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { configureContainer } from '../containers/configure-container';
import { RoomPrismaRepository } from '../persistence/RoomPrismaRepository';
import { UserPrismaRepository } from '../persistence/UserPrismaRepository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: 'Container',
      useFactory: () => {
        return configureContainer();
      },
    },
    {
      provide: 'RoomRepository',
      useClass: RoomPrismaRepository,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
  exports: ['Container', 'RoomRepository', 'UserRepository'],
})
export class ContainerModule {}
