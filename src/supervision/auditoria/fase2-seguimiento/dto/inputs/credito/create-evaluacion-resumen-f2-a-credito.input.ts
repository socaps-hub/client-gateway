import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { AccionResultadoEnum } from '../../../enums/accion-resultado.enum';

@InputType()
export class CreateEvaluacionResumenF2ACreditoInput {
  @Field(() => Int)
  @IsNumber()
  A06Solv: number;

  @Field(() => Int)
  @IsNumber()
  A06NSolv: number;

  @Field(() => AccionResultadoEnum)
  @IsString()
  A06ARes: AccionResultadoEnum;

  @Field(() => String)
  @IsString()
  A06Obs: string;

  @Field(() => String)
  @IsString()
  A06Aud_id: string;
}
