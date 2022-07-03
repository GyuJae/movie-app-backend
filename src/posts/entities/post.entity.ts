import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Media, Post } from '@prisma/client';
import { CoreEntity } from 'src/core/entities/core.entity';

@ObjectType()
export class PostEntity extends CoreEntity implements Post {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  text: string;

  @Field(() => Media)
  mediaType: Media;

  @Field(() => Int)
  mediaId: number;

  @Field(() => String)
  posterPath: string;

  @Field(() => String)
  mediaTitle: string;

  @Field(() => Float)
  vote: number;
}

registerEnumType(Media, {
  name: 'Media',
  description: 'Media Type',
  valuesMap: {
    movie: {
      description: 'Movie Type',
    },
    tv: {
      description: 'TV Shows Type',
    },
  },
});
