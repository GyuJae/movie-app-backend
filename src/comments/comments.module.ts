import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

@Module({
  providers: [CommentsService, CommentsResolver, PrismaService],
})
export class CommentsModule {}
