import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BookmarksService, BookmarksResolver, PrismaService],
})
export class BookmarksModule {}
