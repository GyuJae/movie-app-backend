import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

  async isMeBookmark(
    { mediaId }: IsMeBookmarkInput,
    userId: number,
  ): Promise<IsMeBookmarkOutput> {
    try {
      const bookmarked = await this.prismaService.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId,
            mediaId,
          },
        },
        select: {
          id: true,
        },
      });
      return {
        ok: true,
        isBookmarked: !!bookmarked,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async createBookmark(
    createBookmarkInput: CreateBookmarkInput,
    userId: number,
  ): Promise<CreateBookmarkOutput> {
    try {
      await this.prismaService.bookmark.create({
        data: {
          ...createBookmarkInput,
          userId,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async readBookmarks(userId: number): Promise<ReadBookmarksOutput> {
    try {
      const bookmarks = await this.prismaService.bookmark.findMany({
        where: {
          userId,
        },
      });

      return {
        ok: true,
        bookmarks,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async deleteBookmark(
    { mediaId }: DeleteBookmarkInput,
    userId: number,
  ): Promise<DeleteBookmarkOutput> {
    try {
      const bookmark = await this.prismaService.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId,
            mediaId,
          },
        },
        select: {
          id: true,
        },
      });
      if (!bookmark)
        throw new Error('❌ Not Found Bookmark by this bookmark id');
      await this.prismaService.bookmark.delete({
        where: {
          id: bookmark.id,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async lastBookmark(userId: number): Promise<LastBookmarkOutput> {
    try {
      const bookmark = await this.prismaService.bookmark.findFirst({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return {
        ok: true,
        bookmark,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
