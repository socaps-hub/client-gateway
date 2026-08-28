import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoMedicionAnualOutput {
  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => Float)
  metaAnual: number;

  @Field(() => Float)
  colocacionAcumulada: number;

  @Field(() => Float)
  colocacionPorcentaje: number;

  @Field(() => Float)
  debenLlevar: number;

  @Field(() => Float)
  debenLlevarPorcentaje: number;

  @Field(() => Float)
  cumplimientoEsperadoPorcentaje: number;

  @Field(() => Float)
  deficit: number;
}
