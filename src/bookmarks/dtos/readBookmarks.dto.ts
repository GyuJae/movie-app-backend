import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { BookmarkEntity } from '../entities/bookmark.entity';

@ObjectType()
export class ReadBookmarksOutput extends CoreOutput {
  @Field(() => [BookmarkEntity], { nullable: true })
  bookmarks?: BookmarkEntity[];
}
