import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Elemento } from 'src/supervision/elementos/entities/elemento.entity';
import { Prestamo } from 'src/supervision/fase-i-levantamiento/solicitudes/entities/solicitud.entity';
import { ResFaseII } from 'src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum';

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

  @Field(() => Elemento, { nullable: true })
  elemento?: Elemento;

  @Field(() => Prestamo, { nullable: true })
  prestamo?: Prestamo;

}
