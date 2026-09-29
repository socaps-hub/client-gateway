import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoSocioDetalleCreditoOutput {
  @Field(() => String)
  credito: string;

  @Field(() => Float)
  desembolso: number;

  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => String)
  tipo: string;

  @Field(() => String)
  formaPago: string;

  @Field(() => String)
  producto: string;

  @Field(() => String)
  fechaEntrega: string;

  @Field(() => String)
  fechaVencimiento: string;

  @Field(() => Float)
  capitalVigente: number;

  @Field(() => Float)
  capitalVencido: number;

  @Field(() => Float)
  saldo: number;

  @Field(() => Int)
  diasMora: number;

  @Field(() => Float)
  tasa: number;
}

@ObjectType()
export class CreditoSocioDetalleOutput {
  @Field(() => String)
  cag: string;

  @Field(() => Float)
  totalDesembolso: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => [CreditoSocioDetalleCreditoOutput])
  creditos: CreditoSocioDetalleCreditoOutput[];
}
