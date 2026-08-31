import { Field, InputType, Int } from '@nestjs/graphql';

import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { CreditoFortalezaEnfoque } from '../../enums/credito-fortaleza-enfoque.enum';

@InputType()
export class CreditoFortalezaColocacionInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(12)
  periodoMes: number;

  @Field(() => Int)
  @IsInt()
  @Min(2000)
  periodoAnio: number;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  oficina?: string;

  @Field(() => CreditoFortalezaEnfoque)
  @IsEnum(CreditoFortalezaEnfoque)
  enfoque: CreditoFortalezaEnfoque;
}
