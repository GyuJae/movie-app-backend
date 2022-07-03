import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Roles('USER')
  @Mutation(() => CreatePostOutput)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() currentUser,
  ): Promise<CreatePostOutput> {
    return this.postService.createPost(createPostInput, currentUser.id);
  }
}
