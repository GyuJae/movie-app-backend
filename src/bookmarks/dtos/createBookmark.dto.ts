import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { BookmarkEntity } from '../entities/bookmark.entity';

@InputType()
export class CreateBookmarkInput extends PickType(
  BookmarkEntity,
  ['mediaType', 'mediaId', 'posterPath', 'title', 'releaseDate', 'vote'],
  InputType,
) {}

@ObjectType()
export class CreateBookmarkOutput extends CoreOutput {}
