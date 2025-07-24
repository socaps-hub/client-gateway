import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Elemento } from 'src/supervision/elementos/entities/elemento.entity';
import { ResFaseI } from 'src/supervision/fase-i-levantamiento/evaluaciones/enums/evaluacion.enum';
import { Prestamo } from 'src/supervision/fase-i-levantamiento/solicitudes/entities/solicitud.entity';
import { ResFaseII } from 'src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum';
import { ResFaseIII } from 'src/supervision/fase-iii-desembolso/evaluaciones-fase3/enums/evaluacion-fase3.enum';

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
