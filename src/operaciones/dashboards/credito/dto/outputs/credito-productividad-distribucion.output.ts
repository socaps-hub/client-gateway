import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadDistribucionItemOutput {
  @Field(() => String)
  categoria: string;

  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoProductividadDistribucionPeriodoOutput {
  @Field(() => Float)
  total: number;

  @Field(() => [CreditoProductividadDistribucionItemOutput])
  items: CreditoProductividadDistribucionItemOutput[];
}

@ObjectType()
export class CreditoProductividadDistribucionSaldoItemOutput {
  @Field(() => String)
  categoria: string;

  @Field(() => Float)
  saldo: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoProductividadDistribucionSaldoOutput {
  @Field(() => Float)
  total: number;

  @Field(() => [CreditoProductividadDistribucionSaldoItemOutput])
  items: CreditoProductividadDistribucionSaldoItemOutput[];
}
