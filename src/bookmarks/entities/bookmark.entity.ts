import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Bookmark, Media } from '@prisma/client';
import { CoreEntity } from 'src/core/entities/core.entity';

@ObjectType()
export class BookmarkEntity extends CoreEntity implements Bookmark {
  @Field(() => Int)
  userId: number;

  @Field(() => Media)
  mediaType: Media;

  @Field(() => Int)
  mediaId: number;

  @Field(() => String)
  posterPath: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  releaseDate: string;

  @Field(() => Float)
  vote: number;
}
