import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoTraspasosCarteraVencidaDetalleItemOutput {
  @Field(() => String)
  numeroCredito: string;

  @Field(() => String)
  categoria: string;

  @Field(() => String)
  producto: string;

  @Field(() => String)
  fechaEntrega: string;

  @Field(() => Float)
  cantidadEntregada: number;

  @Field(() => Float)
  saldoTotal: number;

  @Field(() => String)
  fechaCambioSituacion: string;
}

@ObjectType()
export class CreditoTraspasosCarteraVencidaDetalleOutput {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => [CreditoTraspasosCarteraVencidaDetalleItemOutput])
  items: CreditoTraspasosCarteraVencidaDetalleItemOutput[];
}