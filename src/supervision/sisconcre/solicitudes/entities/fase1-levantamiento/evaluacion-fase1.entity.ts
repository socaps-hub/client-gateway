import { ObjectType, Field, ID } from '@nestjs/graphql';

import { ResFaseI } from '../../enums/evaluacion.enum';
import { Prestamo } from '../solicitud.entity';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Elemento } from 'src/supervision/elementos/entities/elemento.entity';

@ObjectType()
export class EvaluacionFase1 {
  @Field(() => ID)
  R05Id: string;

  @Field(() => String)
  R05P_id: string;

  @Field(() => String)
  R05E_id: string;

  @Field(() => ResFaseI)
  R05Res: ResFaseI;

  @Field(() => String)
  R05Ev_por: string;

  @Field(() => String)
  R05Ev_en: string;

  // Relaciones
  @Field(() => Elemento, { nullable: true })
  elemento?: Elemento;

  @Field(() => Usuario, { nullable: true })
  evaluador?: Usuario;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;
}
