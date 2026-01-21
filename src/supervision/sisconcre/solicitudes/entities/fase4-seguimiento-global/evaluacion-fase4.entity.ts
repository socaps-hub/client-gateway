import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Elemento } from 'src/supervision/elementos/entities/elemento.entity';
import { ResFaseII } from '../../enums/evaluacion-fase2.enum';
import { ResFaseIII } from '../../enums/evaluacion-fase3.enum';
import { ResFaseI } from '../../enums/evaluacion.enum';
import { Prestamo } from '../solicitud.entity';

@ObjectType()
export class EvaluacionFase4 {
  @Field(() => ID)
  R15Id: string;

  @Field()
  R15P_num: string;

  @Field()
  R15E_id: string;

  @Field(() => ResFaseII)
  R15Res: ResFaseII;

  @Field(() => ResFaseI, { nullable: true })
  resF1?: ResFaseI;

  @Field(() => ResFaseIII, { nullable: true })
  resF3?: ResFaseIII;

  @Field(() => Elemento, { nullable: true })
  elemento?: Elemento;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

}
