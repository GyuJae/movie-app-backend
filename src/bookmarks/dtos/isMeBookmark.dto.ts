import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';

@InputType()
export class IsMeBookmarkInput {
  @Field(() => Int)
  mediaId: number;
}

@ObjectType()
export class IsMeBookmarkOutput extends CoreOutput {
  @Field(() => Boolean, { defaultValue: false })
  isBookmarked?: boolean;
}
