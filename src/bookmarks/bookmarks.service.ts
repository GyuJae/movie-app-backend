import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/createBookmark.dto';
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
}
