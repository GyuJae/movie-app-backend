import { PostEntity } from './../entities/post.entity';
import { PaginationInput, PaginationOuput } from 'src/core/dtos/pagination';
import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';

@InputType()
export class ReadPostsInput extends PaginationInput {}

@ObjectType()
export class CountForPost {
  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  comments: number;
}

@ObjectType()
class PostWithCount extends PostEntity {
  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => CountForPost)
  _count: CountForPost;
}

@ObjectType()
export class ReadPostsOutput extends PaginationOuput {
  @Field(() => [PostWithCount], { nullable: true })
  posts?: PostWithCount[];
}
