import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dtos/createComment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dtos/deleteComment.dto';

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

  @Roles('USER')
  @Mutation(() => DeleteCommentOutput)
  async deleteCommet(
    @Args('input') deleteCommentInput: DeleteCommentInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeleteCommentOutput> {
    return this.commentService.deleteComment(
      deleteCommentInput,
      currentUser.id,
    );
  }
}
