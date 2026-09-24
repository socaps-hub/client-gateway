import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoSocioMayormenteAcreditadoOutput {
  @Field(() => String)
  cag: string;

  @Field(() => String)
  nombreSocio: string;

  @Field(() => [String])
  sucursales: string[];

  @Field(() => Float)
  totalCreditoOtorgado: number;

  @Field(() => Int)
  numeroPrestamos: number;
}

@ObjectType()
export class CreditoSocioAcreditadoDetalleOutput {
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
export class CreditoSociosAcreditadosSucursalOutput {
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
export class CreditoSociosMayormenteAcreditadosOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoSocioMayormenteAcreditadoOutput])
  socios: CreditoSocioMayormenteAcreditadoOutput[];

  @Field(() => String, {
    nullable: true,
  })
  cagSeleccionado: string | null;

  @Field(() => Float)
  totalDesembolsoSeleccionado: number;

  @Field(() => Float)
  totalSaldoSeleccionado: number;

  @Field(() => [CreditoSocioAcreditadoDetalleOutput])
  creditos: CreditoSocioAcreditadoDetalleOutput[];

  @Field(() => [CreditoSociosAcreditadosSucursalOutput])
  distribucionSucursales: CreditoSociosAcreditadosSucursalOutput[];

  @Field(() => Float)
  totalCreditoOtorgado: number;

  @Field(() => Int)
  totalPrestamos: number;
}
