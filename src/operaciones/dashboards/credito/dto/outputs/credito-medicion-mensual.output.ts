import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoMedicionMensualOutput {
  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => Float)
  metaMes: number;

  @Field(() => Float)
  realColocado: number;

  @Field(() => Float)
  cumplimientoPorcentaje: number;

  @Field(() => Float)
  faltante: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Boolean)
  cumplioMeta: boolean;
}
