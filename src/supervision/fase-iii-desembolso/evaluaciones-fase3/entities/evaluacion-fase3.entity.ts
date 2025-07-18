import { ObjectType, Field, ID } from '@nestjs/graphql';

import { ResFaseIII } from '../enums/evaluacion-fase3.enum';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { Elemento } from 'src/supervision/elementos/entities/elemento.entity';
import { Prestamo } from 'src/supervision/fase-i-levantamiento/solicitudes/entities/solicitud.entity';

@ObjectType()
export class EvaluacionFase3 {

  @Field(() => ID)
  R09Id: string;

  @Field()
  R09P_num: string;

  @Field()
  R09E_id: string;

  @Field(() => ResFaseIII)
  R09Res: ResFaseIII;

  @Field()
  R09Ev_en: string;

  // Relaciones

  @Field(() => Elemento, { nullable: true })
  elemento?: Elemento;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;
}
