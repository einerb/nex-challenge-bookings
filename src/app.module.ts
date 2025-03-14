import { Module } from '@nestjs/common';

import { GraphqlConfigModule } from './presentation/graphql/graphql.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { BookingModule } from './infrastructure/modules/booking.module';
import { ContainerModule } from './infrastructure/modules/container.module';
import { RoomModule } from './infrastructure/modules/room.module';
import { UserModule } from './infrastructure/modules/user.module';

@Module({
  imports: [
    GraphqlConfigModule,
    PrismaModule,
    ContainerModule,
    BookingModule,
    RoomModule,
    UserModule,
  ],
})
export class AppModule {}
