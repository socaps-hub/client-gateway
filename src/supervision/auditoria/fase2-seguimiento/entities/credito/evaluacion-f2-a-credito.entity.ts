import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { MuestraCreditoSeleccion } from 'src/supervision/auditoria/credito/entities/muestra-credito-seleccion.entity';
import { ResFaseII } from 'src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum';

@ObjectType()
export class EvaluacionF2ACredito {
  @Field(() => ID)
  A05Id: string;

  @Field(() => Int)
  A05CSId: number;

  @Field(() => String)
  A05E_id: string;

  @Field(() => ResFaseII)
  A05Res: ResFaseII;

  // ───────────────────────────────
  // Relaciones
  // ───────────────────────────────
  @Field(() => MuestraCreditoSeleccion, { nullable: true })
  creditoSeleccion?: MuestraCreditoSeleccion;
}
