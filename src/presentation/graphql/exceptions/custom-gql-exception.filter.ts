import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import { CustomError } from '../../../domain/exceptions/custom-error';

@Catch()
export class CustomGqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: CustomError) {
    if (exception instanceof CustomError) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: exception.code,
          statusCode: exception.statusCode,
          timestamp: new Date().toISOString(),
        },
      });
    }

    return new GraphQLError('Internal server error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
