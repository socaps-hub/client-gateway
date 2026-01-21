import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Calificativo } from '../../enums/evaluacion.enum';
import { Prestamo } from '../solicitud.entity';

@ObjectType()
export class EvaluacionResumenFase4 {
  @Field(() => ID)
  R16P_num: string;

  @Field(() => Int)
  R16SolvT: number;
  
  @Field(() => Int)
  R16SolvA: number;
  
  @Field(() => Int)
  R16SolvM: number;
  
  @Field(() => Int)
  R16SolvB: number;

  @Field(() => Calificativo)
  R16SegCal: Calificativo;

  @Field(() => Int)
  R16HaSolv: number;

  @Field(() => Int)
  R16PenCu: number;

  @Field(() => Int)
  R16RcF: number;

  @Field(() => Calificativo)
  R16DesCal: Calificativo;

  @Field(() => Calificativo)
  R16CalF: Calificativo;

  @Field(() => String)
  R16Obs: string;

  @Field(() => String)
  R16FGlo: string;

  @Field(() => String)
  R16Ev_por: string;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

  @Field(() => Usuario, { nullable: true })
  evaluador?: Usuario;
}
