import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  CreditoRentabilidadIdentificador,
  CreditoRentabilidadModo,
} from '../../../../enums/credito-rentabilidad.enum';

@ObjectType()
export class CreditoRentabilidadItemOutput {
  @Field(() => String, { nullable: true })
  codigo: string | null;

  @Field(() => String)
  nombre: string;

  @Field(() => String, { nullable: true })
  categoria: string | null;

  @Field(() => Float)
  saldoCapital: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentajeSaldo: number;

  @Field(() => Float)
  interesNormalCobrado: number;

  @Field(() => Float)
  interesMoratorioCobrado: number;

  @Field(() => Float)
  totalInteresCobrado: number;

  @Field(() => Float)
  porcentajeInteres: number;
}

@ObjectType()
export class CreditoRentabilidadResumenOutput {
  @Field(() => Float)
  saldoCapital: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  interesNormalCobrado: number;

  @Field(() => Float)
  interesMoratorioCobrado: number;

  @Field(() => Float)
  totalInteresCobrado: number;
}

@ObjectType()
export class CreditoRentabilidadGraficaItemOutput {
  @Field(() => String, { nullable: true })
  codigo: string | null;

  @Field(() => String)
  nombre: string;

  @Field(() => String, { nullable: true })
  categoria: string | null;

  @Field(() => Float)
  valor: number;
}

@ObjectType()
export class CreditoRentabilidadOutput {
  @Field(() => CreditoRentabilidadModo)
  modo: CreditoRentabilidadModo;

  @Field(() => String, { nullable: true })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => CreditoRentabilidadIdentificador)
  identificador: CreditoRentabilidadIdentificador;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => CreditoRentabilidadResumenOutput)
  totales: CreditoRentabilidadResumenOutput;

  @Field(() => [CreditoRentabilidadItemOutput])
  items: CreditoRentabilidadItemOutput[];

  @Field(() => [CreditoRentabilidadItemOutput])
  top5: CreditoRentabilidadItemOutput[];

  @Field(() => [CreditoRentabilidadGraficaItemOutput])
  grafica: CreditoRentabilidadGraficaItemOutput[];
}
