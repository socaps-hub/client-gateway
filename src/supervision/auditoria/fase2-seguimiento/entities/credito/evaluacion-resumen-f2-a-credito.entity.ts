import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { AccionResultadoEnum } from '../../enums/accion-resultado.enum';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { MuestraCreditoSeleccion } from 'src/supervision/auditoria/credito/entities/muestra-credito-seleccion.entity';

@ObjectType()
export class EvaluacionResumenF2ACredito {
  @Field(() => Int)
  A06Id: number;

  @Field(() => Int)
  A06Solv: number;

  @Field(() => Int)
  A06NSolv: number;

  @Field(() => AccionResultadoEnum)
  A06ARes: AccionResultadoEnum;

  @Field(() => String)
  A06Obs: string;

  @Field(() => ID)
  A06Aud_id: string;

  @Field(() => String)
  A06FSeg: string;

  // ───────────────────────────────
  // Relaciones
  // ───────────────────────────────
  @Field(() => MuestraCreditoSeleccion, { nullable: true })
  creditoSeleccion?: MuestraCreditoSeleccion;

  @Field(() => Usuario, { nullable: true })
  auditor?: Usuario;
}
