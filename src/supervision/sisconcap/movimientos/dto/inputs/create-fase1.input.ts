import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { CreateMovimientoInput } from './create-movimiento.input';
import { CreateSisconcapEvaluacionFase1Input } from './create-sisconcap-evaluacion-fase1.input';
import { CreateSisconcapEvaluacionResumenFase1Input } from './create-sisconcap-resumen-fase1.input';

@InputType()
export class CreateFase1Input {
  @Field(() => CreateMovimientoInput)
  @ValidateNested()
  @Type(() => CreateMovimientoInput)
  movimiento: CreateMovimientoInput;

  @Field(() => [CreateSisconcapEvaluacionFase1Input])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSisconcapEvaluacionFase1Input)
  evaluaciones: CreateSisconcapEvaluacionFase1Input[];

  @Field(() => CreateSisconcapEvaluacionResumenFase1Input)
  @ValidateNested()
  @Type(() => CreateSisconcapEvaluacionResumenFase1Input)
  resumen: CreateSisconcapEvaluacionResumenFase1Input;
}
