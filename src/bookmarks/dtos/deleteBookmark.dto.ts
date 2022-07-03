import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';

@InputType()
export class DeleteBookmarkInput {
  @Field(() => Int)
  bookmarkId: number;
}

@ObjectType()
export class DeleteBookmarkOutput extends CoreOutput {}
