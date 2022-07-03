import { UserEntity } from 'src/users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import {
  ReadPostDetailInput,
  ReadPostDetailOutput,
} from './dtos/readPostDetail.dto';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Query(() => ReadPostsOutput)
  async readPosts(
    @Args('input') readPostsInput: ReadPostsInput,
  ): Promise<ReadPostsOutput> {
    return this.postService.readPosts(readPostsInput);
  }

  @Query(() => ReadPostDetailOutput)
  async readPostDetail(
    @Args('input') readPostDetailInput: ReadPostDetailInput,
  ): Promise<ReadPostDetailOutput> {
    return this.postService.readPostDetail(readPostDetailInput);
  }

  @Roles('USER')
  @Mutation(() => CreatePostOutput)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, currentUser.id);
  }

  @Roles('USER')
  @Mutation(() => DeletePostOutput)
  async deletePost(
    @Args('input') deletePostInput: DeletePostInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeletePostOutput> {
    return this.postService.deletePost(deletePostInput, currentUser.id);
  }
}
