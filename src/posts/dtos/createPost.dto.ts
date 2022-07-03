import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { PostEntity } from '../entities/post.entity';

@InputType()
export class CreatePostInput extends PickType(
  PostEntity,
  ['text', 'mediaType', 'mediaId', 'posterPath', 'mediaTitle', 'vote'],
  InputType,
) {}

@ObjectType()
export class CreatePostOutput extends CoreOutput {}
