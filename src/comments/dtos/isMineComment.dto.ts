import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class IsMineCommentInput {
  @Field(() => Int)
  commentId: number;
}

@ObjectType()
export class IsMineCommentOutput {
  @Field(() => Boolean, { defaultValue: false })
  isMine: boolean;
}
