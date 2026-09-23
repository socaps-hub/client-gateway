import { Field, InputType, Int } from '@nestjs/graphql';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class CreditoPersonasRelacionadasInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsIn(['2', '3', '4', '6', '7'])
  tipoRelacion?: string;
}

@InputType()
export class CreditoPersonasRelacionadasCreditosInput extends CreditoPersonasRelacionadasInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize: number;
}