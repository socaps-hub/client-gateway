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
export class CreditoSocioMayorSaldoDetalleOutput {
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

  @Field(() => String, {
    nullable: true,
  })
  cagSeleccionado: string | null;

  @Field(() => Float)
  totalDesembolsoSeleccionado: number;

  @Field(() => Float)
  totalSaldoSeleccionado: number;

  @Field(() => [CreditoSocioMayorSaldoDetalleOutput])
  creditos: CreditoSocioMayorSaldoDetalleOutput[];

  @Field(() => [CreditoSociosMayoresSaldosSucursalOutput])
  distribucionSucursales: CreditoSociosMayoresSaldosSucursalOutput[];

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => Int)
  totalPrestamos: number;
}
