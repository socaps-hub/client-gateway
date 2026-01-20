import { IsNumber, IsString, IsUUID } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { Calificativo } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion.enum';

@InputType()
export class CreateSisconcapEvaluacionResumenFase1Input {
  // @Field(() => Int)
  // @IsNumber()
  // R21Folio: number;

  @Field(() => Int)
  @IsNumber()
  R21Ha: number;

  @Field(() => Int)
  @IsNumber()
  R21Rc: number;

  @Field(() => Calificativo)
  @IsString()
  R21Cal: Calificativo;

  @Field(() => String)
  @IsString()
  R21Obs: string;

  @Field(() => String)
  @IsUUID()
  R21Ejvo_id: string;
}
