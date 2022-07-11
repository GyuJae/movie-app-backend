import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';

@InputType()
export class IsLikePostInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
export class IsLikePostOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  isLike?: boolean;
}
