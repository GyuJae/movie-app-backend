import { UserEntity } from './../users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { CommentEntity } from './entities/comment.entity';
import {
  IsMineCommentInput,
  IsMineCommentOutput,
} from './dtos/isMineComment.dto';

@Resolver(() => CommentEntity)
export class CommentsResolver {
  constructor(private commentService: CommentsService) {}

  @Roles('USER')
  @Query(() => IsMineCommentOutput)
  async isMineComment(
    @Args('input') isMineCommentInput: IsMineCommentInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<IsMineCommentOutput> {
    if (!currentUser)
      return {
        isMine: false,
      };
    return this.commentService.isMineComment(
      isMineCommentInput,
      currentUser.id,
    );
  }

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
  async deleteComment(
    @Args('input') deleteCommentInput: DeleteCommentInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeleteCommentOutput> {
    return this.commentService.deleteComment(
      deleteCommentInput,
      currentUser.id,
    );
  }
}
