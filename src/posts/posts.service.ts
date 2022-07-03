import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

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
