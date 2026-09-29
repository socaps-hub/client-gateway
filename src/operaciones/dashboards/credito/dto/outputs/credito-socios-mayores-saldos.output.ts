import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoSocioMayorSaldoOutput {
  @Field(() => String)
  cag: string;

  @Field(() => String)
  nombreSocio: string;

  @Field(() => [String])
  sucursales: string[];

  @Field(() => Float)
  saldo: number;

  @Field(() => Int)
  numeroPrestamos: number;
}

@ObjectType()
export class CreditoSociosMayoresSaldosSucursalOutput {
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
export class CreditoSociosMayoresSaldosOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoSocioMayorSaldoOutput])
  socios: CreditoSocioMayorSaldoOutput[];

  @Field(() => [CreditoSociosMayoresSaldosSucursalOutput])
  distribucionSucursales: CreditoSociosMayoresSaldosSucursalOutput[];

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => Int)
  totalPrestamos: number;
}