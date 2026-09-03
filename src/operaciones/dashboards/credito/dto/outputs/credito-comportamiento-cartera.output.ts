import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoComportamientoCarteraMesOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float, {
    nullable: true,
  })
  saldo: number | null;

  @Field(() => Boolean)
  disponible: boolean;
}

@ObjectType()
export class CreditoComportamientoCarteraResumenOutput {
  @Field(() => Float)
  saldo: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  participacionOficinaPorcentaje: number;

  @Field(() => Float)
  vigente: number;

  @Field(() => Int)
  prestamosVigentes: number;

  @Field(() => Float)
  vigentePorcentaje: number;

  @Field(() => Float)
  vencida: number;

  @Field(() => Int)
  prestamosVencidos: number;

  @Field(() => Float)
  vencidaPorcentaje: number;
}

@ObjectType()
export class CreditoComportamientoCarteraOutput {
  @Field(() => String, { nullable: true })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => String, { nullable: true })
  productoId: string | null;

  @Field(() => String)
  productoNombre: string;

  @Field(() => String, { nullable: true })
  productoCategoria: string | null;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => Float)
  saldoPromedio: number;

  @Field(() => CreditoComportamientoCarteraResumenOutput)
  resumen: CreditoComportamientoCarteraResumenOutput;

  @Field(() => [CreditoComportamientoCarteraMesOutput])
  meses: CreditoComportamientoCarteraMesOutput[];
}