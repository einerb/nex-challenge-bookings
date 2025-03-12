import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlConfigModule } from './infrastructure/graphql/graphql.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [GraphqlConfigModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
