import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Calificativo, Resolucion } from '../../enums/evaluacion.enum';
import { Prestamo } from 'src/supervision/sisconcre/solicitudes/entities/solicitud.entity';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@ObjectType()
export class EvaluacionResumenFase1 {
  @Field(() => ID)
  R06P_num: string;

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
