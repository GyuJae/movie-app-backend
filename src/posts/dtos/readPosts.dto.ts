import { PostEntity } from './../entities/post.entity';
import { PaginationInput, PaginationOuput } from 'src/core/dtos/pagination';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class ReadPostsInput extends PaginationInput {}

@ObjectType()
export class ReadPostsOutput extends PaginationOuput {
  @Field(() => [PostEntity], { nullable: true })
  posts?: PostEntity[];
}
