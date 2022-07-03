import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/createComment.dto';

@Resolver()
export class CommentsResolver {
  constructor(private commentService: CommentsService) {}

  @Roles('USER')
  @Mutation(() => CreateCommentOutput)
  async createComment(
    @Args('input') createCommentInput: CreateCommentInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<CreateCommentOutput> {
    return this.commentService.createComment(
      createCommentInput,
      currentUser.id,
    );
  }
}
