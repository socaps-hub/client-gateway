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

  @Field(() => [CreditoSociosAcreditadosSucursalOutput])
  distribucionSucursales: CreditoSociosAcreditadosSucursalOutput[];

  @Field(() => Float)
  totalCreditoOtorgado: number;

  @Field(() => Int)
  totalPrestamos: number;
}