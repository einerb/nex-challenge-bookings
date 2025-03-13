import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.gql',
      ),
      sortSchema: true,
      debug: true,
    }),
  ],
  providers: [DateScalar],
})
export class GraphqlConfigModule {}
