import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadCalidadCarteraOutput {
  @Field(() => Float)
  saldoVigente: number;

  @Field(() => Float)
  porcentajeVigente: number;

  @Field(() => Float)
  saldoVencido: number;

  @Field(() => Float)
  porcentajeVencido: number;
}

@ObjectType()
export class CreditoProductividadParticipacionEjecutivoOutput {
  @Field(() => Float)
  saldoEjecutivo: number;

  @Field(() => Float)
  porcentajeEjecutivo: number;

  @Field(() => Float)
  saldoResto: number;

  @Field(() => Float)
  porcentajeResto: number;
}

@ObjectType()
export class CreditoProductividadGraficasEjecutivoOutput {
  @Field(() => CreditoProductividadCalidadCarteraOutput)
  calidadCartera: CreditoProductividadCalidadCarteraOutput;

  @Field(() => CreditoProductividadParticipacionEjecutivoOutput)
  participacionSaldo: CreditoProductividadParticipacionEjecutivoOutput;
}
