import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { MuestraCreditoSeleccion } from 'src/supervision/auditoria/credito/entities/muestra-credito-seleccion.entity';
import { ResFaseI } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion.enum';

@ObjectType()
export class EvaluacionF1ACredito {
  @Field(() => ID)
  A03Id: string;

  @Field(() => Int)
  A03CSId: number;

  @Field(() => String)
  A03E_id: string;

  @Field(() => ResFaseI)
  A03Res: ResFaseI;

  // ───────────────────────────────
  // Relaciones
  // ───────────────────────────────
  @Field(() => MuestraCreditoSeleccion, { nullable: true })
  creditoSeleccion?: MuestraCreditoSeleccion;
}
