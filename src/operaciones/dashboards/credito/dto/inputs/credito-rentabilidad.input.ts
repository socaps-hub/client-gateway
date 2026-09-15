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
import {
  CreditoRentabilidadIdentificador,
  CreditoRentabilidadModo,
} from '../../../../enums/credito-rentabilidad.enum';

@InputType()
export class CreditoRentabilidadInput {
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

  @Field(() => CreditoRentabilidadModo)
  @IsEnum(CreditoRentabilidadModo)
  modo: CreditoRentabilidadModo;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  oficina?: string;

  @Field(() => CreditoRentabilidadIdentificador)
  @IsEnum(CreditoRentabilidadIdentificador)
  identificador: CreditoRentabilidadIdentificador;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  page: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  pageSize: number;
}
