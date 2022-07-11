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
import { LikeEntity } from './entities/like.entity';
import { LikeToggleInput, LikeToggleOutput } from './dtos/likeToggle.dto';
import { IsLikePostInput, IsLikePostOutput } from './dtos/isLikePost.dto';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Roles('USER')
  @Query(() => IsLikePostOutput)
  async isLikePost(
    @Args('input') isLikePostInput: IsLikePostInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<IsLikePostOutput> {
    return this.postService.isLikePost(isLikePostInput, currentUser.id);
  }

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

@Resolver(() => LikeEntity)
export class LikesResolver {
  constructor(private postService: PostsService) {}

  @Roles('USER')
  @Mutation(() => LikeToggleOutput)
  async likeToggle(
    @Args('input') likeToggleInput: LikeToggleInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<LikeToggleOutput> {
    return this.postService.likeToggle(likeToggleInput, currentUser.id);
  }
}
