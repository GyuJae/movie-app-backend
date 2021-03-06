import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, Roles } from 'src/auth/auth.decorator';
import { CreateCommentOutput } from 'src/comments/dtos/createComment.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { BookmarksService } from './bookmarks.service';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/createBookmark.dto';
import {
  DeleteBookmarkInput,
  DeleteBookmarkOutput,
} from './dtos/deleteBookmark.dto';
import { IsMeBookmarkInput, IsMeBookmarkOutput } from './dtos/isMeBookmark.dto';
import { LastBookmarkOutput } from './dtos/lastBookmark.dto';
import { ReadBookmarksOutput } from './dtos/readBookmarks.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Resolver(() => BookmarkEntity)
export class BookmarksResolver {
  constructor(private bookmarkService: BookmarksService) {}

  @Roles('USER')
  @Query(() => IsMeBookmarkOutput)
  async isMeBookmark(
    @Args('input') isMeBookmarkInput: IsMeBookmarkInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<IsMeBookmarkOutput> {
    return this.bookmarkService.isMeBookmark(isMeBookmarkInput, currentUser.id);
  }

  @Roles('USER')
  @Query(() => ReadBookmarksOutput)
  async readBookmarks(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<ReadBookmarksOutput> {
    return this.bookmarkService.readBookmarks(currentUser.id);
  }

  @Roles('USER')
  @Query(() => LastBookmarkOutput)
  async lastBookmark(
    @CurrentUser() currentUser: UserEntity,
  ): Promise<LastBookmarkOutput> {
    return this.bookmarkService.lastBookmark(currentUser.id);
  }

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

  @Roles('USER')
  @Mutation(() => DeleteBookmarkOutput)
  async deleteBookmark(
    @Args('input') deleteBookmarkInput: DeleteBookmarkInput,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<DeleteBookmarkOutput> {
    return this.bookmarkService.deleteBookmark(
      deleteBookmarkInput,
      currentUser.id,
    );
  }
}
