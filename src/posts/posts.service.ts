import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import {
  ReadPostDetailInput,
  ReadPostDetailOutput,
} from './dtos/readPostDetail.dto';

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
              likes: true,
              comments: true,
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

  async readPostDetail({
    postId,
  }: ReadPostDetailInput): Promise<ReadPostDetailOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          comments: true,
          user: true,
          _count: true,
        },
      });
      if (!post) throw new Error('❌ Not Found Post by this post id');
      return {
        ok: true,
        post,
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

  async deletePost(
    { postId }: DeletePostInput,
    userId: number,
  ): Promise<DeletePostOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!post) throw new Error('❌ Not Found Post by this postId');
      if (post.userId !== userId) throw new Error('❌ No Authorization');
      await this.prismaService.post.delete({ where: { id: post.id } });
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
