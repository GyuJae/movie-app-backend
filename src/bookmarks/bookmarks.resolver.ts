import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CreateCommentOutput } from 'src/comments/dtos/createComment.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookmarksService } from './bookmarks.service';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/createBookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Resolver(() => BookmarkEntity)
export class BookmarksResolver {
  constructor(private bookmarkService: BookmarksService) {}

  @Roles('USER')
  @Mutation(() => CreateBookmarkOutput)
  async createBookmark(
    @Args('input') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<CreateCommentOutput> {
    return this.bookmarkService.createBookmark(
      createBookmarkInput,
      currentUser.id,
    );
  }
}
