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
import { LastBookmarkOutput } from './dtos/lastBookmark.dto';
import { ReadBookmarksOutput } from './dtos/readBookmarks.dto';

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

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
    { bookmarkId }: DeleteBookmarkInput,
    userId: number,
  ): Promise<DeleteBookmarkOutput> {
    try {
      const bookmark = await this.prismaService.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!bookmark)
        throw new Error('❌ Not Found Bookmark by this bookmark id');
      if (bookmark.userId !== userId) throw new Error('❌ No Authorization');
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
