import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Prestamo } from '../solicitud.entity';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Calificativo, Resolucion } from '../../enums/evaluacion.enum';

@ObjectType()
export class EvaluacionResumenFase1 {
  @Field(() => ID)
  R06Id: string;

  @Field(() => String)
  R06P_id: string;

  @Field(() => Int)
  R06Ha: number;

  @Field(() => Int)
  R06Hm: number;

  @Field(() => Int)
  R06Hb: number;

  @Field(() => Int)
  R06Rc: number;

  @Field(() => Calificativo)
  R06Cal: Calificativo;

  @Field(() => Resolucion)
  R06Res: Resolucion;

  @Field(() => ID)
  R06Ev_por: string;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

  @Field(() => Usuario, { nullable: true })
  evaluador?: Usuario;
}
