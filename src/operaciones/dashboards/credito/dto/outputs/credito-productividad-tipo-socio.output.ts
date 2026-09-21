import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  CreditoProductividadDistribucionPeriodoOutput,
  CreditoProductividadDistribucionSaldoOutput,
} from './credito-productividad-distribucion.output';

@ObjectType()
export class CreditoProductividadTipoSocioOutput {
  @Field(() => CreditoProductividadDistribucionPeriodoOutput)
  delMes: CreditoProductividadDistribucionPeriodoOutput;

  @Field(() => CreditoProductividadDistribucionPeriodoOutput)
  delAnio: CreditoProductividadDistribucionPeriodoOutput;

  @Field(() => CreditoProductividadDistribucionPeriodoOutput)
  acumulado: CreditoProductividadDistribucionPeriodoOutput;

  @Field(() => CreditoProductividadDistribucionSaldoOutput)
  saldo: CreditoProductividadDistribucionSaldoOutput;
}
