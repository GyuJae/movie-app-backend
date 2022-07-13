import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCommentOutput,
  CreateCommentInput,
} from './dtos/createComment.dto';
import {
  DeleteCommentInput,
  DeleteCommentOutput,
} from './dtos/deleteComment.dto';
import {
  IsMineCommentInput,
  IsMineCommentOutput,
} from './dtos/isMineComment.dto';

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async isMineComment(
    { commentId }: IsMineCommentInput,
    userId: number,
  ): Promise<IsMineCommentOutput> {
    try {
      const comment = await this.prismaService.comment.findFirst({
        where: {
          id: commentId,
          userId,
        },
        select: {
          id: true,
        },
      });

      return {
        isMine: !!comment,
      };
    } catch {
      return {
        isMine: false,
      };
    }
  }

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

  async deleteComment(
    { commentId }: DeleteCommentInput,
    userId: number,
  ): Promise<DeleteCommentOutput> {
    try {
      const comment = await this.prismaService.comment.findUnique({
        where: {
          id: commentId,
        },
        select: {
          id: true,
          userId: true,
        },
      });
      if (!comment) throw new Error('❌ Not Found Comment by this comment id');
      if (comment.userId !== userId) throw new Error('❌ No Authorization');
      await this.prismaService.comment.delete({
        where: {
          id: comment.id,
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
