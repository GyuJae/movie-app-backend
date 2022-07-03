import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './coreOutput.dto';

@ObjectType()
export class PaginationOuput extends CoreOutput {
  @Field(() => Int, { nullable: true })
  totalResult?: number;

  @Field(() => Int, { nullable: true })
  totalPage?: number;
}
