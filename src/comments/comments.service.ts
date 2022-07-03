import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentOutput,
  CreateCommentInput,
} from './dtos/createComment.dto';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async createComment(
    { postId, comment }: CreateCommentInput,
    userId: number,
  ): Promise<CreateCommentOutput> {
    try {
      const post = await this.prismaService.post.findUnique({
        where: {
          id: postId,
        },
        select: {
          id: true,
        },
      });
      if (!post) throw new Error('❌ Not Found Post by this post id');
      await this.prismaService.comment.create({
        data: {
          userId,
          postId: post.id,
          comment,
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
