import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { LikesResolver, PostsResolver } from './posts.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PostsService, PostsResolver, PrismaService, LikesResolver],
})
export class PostsModule {}
