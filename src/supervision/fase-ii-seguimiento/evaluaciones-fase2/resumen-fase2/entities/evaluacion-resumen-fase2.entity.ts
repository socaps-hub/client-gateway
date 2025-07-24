import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Calificativo, Resolucion } from 'src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum';
import { Prestamo } from 'src/supervision/fase-i-levantamiento/solicitudes/entities/solicitud.entity';

@ObjectType()
export class EvaluacionResumenFase2 {
  @Field(() => ID)
  R08P_num: string;

  @Field(() => Int)
  R08SolvT: number;

  @Field(() => Int)
  R08SolvA: number;

  @Field(() => Int)
  R08SolvM: number;

  @Field(() => Int)
  R08SolvB: number;

  @Field(() => Int)
  R08Rc: number;

  @Field(() => Calificativo)
  R08Cal: Calificativo;

  @Field(() => Resolucion)
  R08Res: Resolucion;

  @Field(() => String)
  R08Obs: string;

  @Field(() => String)
  R08FSeg: string;

  @Field(() => ID)
  R08Ev_por: string;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

  @Field(() => Usuario, { nullable: true })
  evaluador?: Usuario;
}
