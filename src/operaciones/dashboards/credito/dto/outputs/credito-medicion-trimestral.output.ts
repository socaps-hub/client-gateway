import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { CreditoMedicionTrimestralMesOutput } from './credito-medicion-trimestral-mes.output';

@ObjectType()
export class CreditoMedicionTrimestralOutput {
  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => Int)
  numeroTrimestre: number;

  @Field(() => Int)
  mesInicioTrimestre: number;

  @Field(() => Int)
  mesFinTrimestre: number;

  @Field(() => Float)
  capitalColocadoTrimestre: number;

  @Field(() => [CreditoMedicionTrimestralMesOutput])
  meses: CreditoMedicionTrimestralMesOutput[];
}
