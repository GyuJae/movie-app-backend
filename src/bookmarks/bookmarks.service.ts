import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/createBookmark.dto';

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
}
