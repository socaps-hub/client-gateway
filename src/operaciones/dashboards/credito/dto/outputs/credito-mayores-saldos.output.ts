import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoMayorSaldoSucursalOutput {
  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => Float)
  monto: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoMayorSaldoOutput {
  @Field(() => String)
  credito: string;

  @Field(() => String)
  cag: string;

  @Field(() => String)
  nombreSocio: string;

  @Field(() => String)
  sucursal: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => String)
  tipo: string;

  @Field(() => String)
  formaPago: string;

  @Field(() => String)
  numeroAmortizaciones: string;

  @Field(() => Int)
  plazoDias: number;

  @Field(() => Float)
  periodicidadDias: number;

  @Field(() => String)
  categoria: string;

  @Field(() => String)
  fechaEntrega: string;

  @Field(() => String)
  fechaVencimiento: string;

  @Field(() => Float)
  cantidadEntregada: number;

  @Field(() => Float)
  capitalVencido: number;

  @Field(() => Float)
  capitalCobrado: number;

  @Field(() => Float)
  capitalCarteraVigente: number;

  @Field(() => Float)
  capitalCarteraVencida: number;

  @Field(() => Float)
  interesNormal: number;

  @Field(() => Float)
  interesMoratorio: number;

  @Field(() => Float)
  interesNormalCarteraVencida: number;

  @Field(() => Float)
  interesMoratorioCarteraVencida: number;

  @Field(() => Float)
  saldo: number;
}

@ObjectType()
export class CreditoMayoresSaldosOutput {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => Float)
  totalCantidadEntregada: number;

  @Field(() => Float)
  totalCapitalVencido: number;

  @Field(() => Float)
  totalCapitalCobrado: number;

  @Field(() => Float)
  totalCapitalCarteraVigente: number;

  @Field(() => Float)
  totalCapitalCarteraVencida: number;

  @Field(() => Float)
  totalInteresNormal: number;

  @Field(() => Float)
  totalInteresMoratorio: number;

  @Field(() => Float)
  totalInteresNormalCarteraVencida: number;

  @Field(() => Float)
  totalInteresMoratorioCarteraVencida: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => [CreditoMayorSaldoOutput])
  items: CreditoMayorSaldoOutput[];

  @Field(() => [CreditoMayorSaldoSucursalOutput])
  distribucionSucursales: CreditoMayorSaldoSucursalOutput[];
}