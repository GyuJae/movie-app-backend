import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { CommentEntity } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(
  CommentEntity,
  ['comment', 'postId'],
  InputType,
) {}

@ObjectType()
export class CreateCommentOutput extends CoreOutput {}
