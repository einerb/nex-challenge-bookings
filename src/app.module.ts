import { Module } from '@nestjs/common';

import { GraphqlConfigModule } from './presentation/graphql/graphql.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { BookingModule } from './infrastructure/modules/booking.module';

@Module({
  imports: [GraphqlConfigModule, PrismaModule, BookingModule],
})
export class AppModule {}
