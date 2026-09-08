import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoTraspasosCarteraVencidaCardOutput {
  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float, {
    nullable: true,
  })
  porcentaje: number | null;
}

@ObjectType()
export class CreditoTraspasosCarteraVencidaMesOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float, {
    nullable: true,
  })
  carteraVencida: number | null;

  @Field(() => Float, {
    nullable: true,
  })
  indiceMorosidad: number | null;

  @Field(() => Boolean)
  disponible: boolean;
}

@ObjectType()
export class CreditoTraspasosCarteraVencidaOutput {
  @Field(() => String, {
    nullable: true,
  })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => String, {
    nullable: true,
  })
  productoId: string | null;

  @Field(() => String, {
    nullable: true,
  })
  productoNombre: string | null;

  @Field(() => String, {
    nullable: true,
  })
  productoCategoria: string | null;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => CreditoTraspasosCarteraVencidaCardOutput)
  carteraVencidaCooperativa: CreditoTraspasosCarteraVencidaCardOutput;

  @Field(() => CreditoTraspasosCarteraVencidaCardOutput)
  carteraVencidaSucursal: CreditoTraspasosCarteraVencidaCardOutput;

  @Field(() => CreditoTraspasosCarteraVencidaCardOutput)
  carteraVencidaSegmento: CreditoTraspasosCarteraVencidaCardOutput;

  @Field(() => CreditoTraspasosCarteraVencidaCardOutput)
  traspasosMesSucursal: CreditoTraspasosCarteraVencidaCardOutput;

  @Field(() => CreditoTraspasosCarteraVencidaCardOutput)
  traspasosMesSegmento: CreditoTraspasosCarteraVencidaCardOutput;

  @Field(() => [CreditoTraspasosCarteraVencidaMesOutput])
  meses: CreditoTraspasosCarteraVencidaMesOutput[];
}
