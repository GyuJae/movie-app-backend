import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async readPosts({
    take = 25,
    skip = 0,
  }: ReadPostsInput): Promise<ReadPostsOutput> {
    try {
      const posts = await this.prismaService.post.findMany({
        skip,
        take,
        include: {
          user: true,
          _count: {
            select: {
              Like: true,
              Comment: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const totalCount = await this.prismaService.post.count({});
      return {
        ok: true,
        posts,
        totalCount,
        totalPage: Math.ceil(totalCount / take),
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async createPost(
    createPostInput: CreatePostInput,
    userId: number,
  ): Promise<CreatePostOutput> {
    try {
      await this.prismaService.post.create({
        data: { ...createPostInput, userId },
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
