import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './coreOutput.dto';

@InputType()
export class PaginationInput {
  @Field(() => Number)
  take: number;

  @Field(() => Number)
  skip: number;
}

@ObjectType()
export class PaginationOuput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  totalCount?: number;

  @Field(() => Int, { nullable: true })
  totalPage?: number;
}
