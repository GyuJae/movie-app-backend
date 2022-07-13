import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaModule } from './prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AppController } from './app.controller';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    UsersModule,
    PrismaModule,
    CoreModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    CommentsModule,
    BookmarksModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
