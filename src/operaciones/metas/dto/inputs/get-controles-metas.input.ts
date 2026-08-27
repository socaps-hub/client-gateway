import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';

@InputType()
export class GetControlesMetasInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  cooperativaId?: string;

  @Field(() => OpMetaAreaEnum, { nullable: true })
  @IsOptional()
  @IsEnum(OpMetaAreaEnum)
  area?: OpMetaAreaEnum;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(2000)
  periodoAnio?: number;
}
