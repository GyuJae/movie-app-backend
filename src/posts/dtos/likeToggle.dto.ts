import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/dtos/coreOutput.dto';
import { LikeEntity } from '../entities/like.entity';

@InputType()
export class LikeToggleInput extends PickType(
  LikeEntity,
  ['postId'],
  InputType,
) {}

@ObjectType()
export class LikeToggleOutput extends CoreOutput {}
