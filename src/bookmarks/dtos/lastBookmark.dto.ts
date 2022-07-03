import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { BookmarkEntity } from '../entities/bookmark.entity';

@ObjectType()
export class LastBookmarkOutput extends CoreOutput {
  @Field(() => BookmarkEntity, { nullable: true })
  bookmark?: BookmarkEntity;
}
