import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Calificativo } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion.enum';


@InputType()
export class CreateEvaluacionResumenFase3Input {
  
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
  
  @Field()
  @IsString()
  R10Obs: string;
  
  @Field(() => ID)
  @IsString()
  R10Ev_por: string
}
