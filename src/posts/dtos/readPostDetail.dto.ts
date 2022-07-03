import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { CountForPost } from './readPosts.dto';

@InputType()
export class ReadPostDetailInput {
  @Field(() => Int)
  postId: number;
}

@ObjectType()
class PostDetailEntity extends PostEntity {
  @Field(() => [CommentEntity])
  comments: CommentEntity[];

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => CountForPost)
  _count: CountForPost;
}

@ObjectType()
export class ReadPostDetailOutput extends CoreOutput {
  @Field(() => PostDetailEntity, { nullable: true })
  post?: PostDetailEntity;
}
