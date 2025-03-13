import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new Error(`parseValue: expected string, got ${typeof value}`);
    }
    return new Date(value);
  }

  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error('serialize: value is not an instance of Date');
    }
    return value.toISOString();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    throw new Error(`parseLiteral: expected a string, got ${ast.kind}`);
  }
}
