import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Calificativo } from 'src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum';


@InputType()
export class CreateEvaluacionResumenFase3Input {
  
  @Field()
  @IsString()
  R10P_num: string;

  @Field(() => Int)
  @IsNumber()
  R10Ha: number;
  
  @Field(() => Int)
  @IsNumber()
  R10Pendientes: number;
  
  @Field(() => Int)
  @IsNumber()
  R10Rc: number;

  @Field(() => Calificativo)
  @IsString()
  R10Cal: Calificativo;
  
  @Field(() => String)
  @IsString()
  R10Obs: string;

  @Field(() => ID)
  @IsString()
  R10Ev_por: string
}
