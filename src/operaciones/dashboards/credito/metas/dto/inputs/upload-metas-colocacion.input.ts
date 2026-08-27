import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { OpMetaAreaEnum } from '../../../../../enums/op-meta-area.enum';

@InputType()
export class UploadMetasColocacionInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => Int)
  @IsInt()
  @Min(2000)
  periodoAnio: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  s3Key: string;

  @Field(() => OpMetaAreaEnum)
  @IsEnum(OpMetaAreaEnum)
  area: OpMetaAreaEnum;
}
