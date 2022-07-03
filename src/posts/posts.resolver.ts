import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Query(() => ReadPostsOutput)
  async readPosts(
    @Args('input') readPostsInput: ReadPostsInput,
  ): Promise<ReadPostsOutput> {
    return this.postService.readPosts(readPostsInput);
  }

  @Roles('USER')
  @Mutation(() => CreatePostOutput)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() currentUser,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, currentUser.id);
  }
}
