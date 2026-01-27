import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Calificativo } from '../../enums/evaluacion.enum';
import { Prestamo } from '../solicitud.entity';


@ObjectType()
export class EvaluacionResumenFase3 {

  @Field(() => ID)
  R10Id: string;

  @Field(() => ID)
  R10P_id: string;

  @Field(() => Int)
  R10Ha: number; // Hallazgos

  @Field(() => Int)
  R10Pendientes: number;

  @Field(() => Int)
  R10Rc: number; // Resultados correctos

  @Field(() => Calificativo)
  R10Cal: Calificativo;

  @Field(() => String)
  R10Obs: string;
  
  @Field(() => String)
  R10FDes: string;
  
  @Field(() => ID)
  R10Ev_por: string

  @Field(() => ID)
  R10Sup: string

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

  @Field(() => Usuario, { nullable: true })
  evaluador?: Usuario;

  @Field(() => Usuario, { nullable: true })
  supervisor?: Usuario;
  
}
