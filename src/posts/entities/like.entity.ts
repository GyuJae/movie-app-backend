import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Like } from '@prisma/client';
import { CoreEntity } from 'src/core/entities/core.entity';

@ObjectType()
export class LikeEntity extends CoreEntity implements Like {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  postId: number;
}
