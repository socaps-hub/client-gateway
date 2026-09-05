import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoDiasAtrasoRangoOutput {
  @Field(() => String)
  rango: string;

  @Field(() => Int)
  desde: number;

  @Field(() => Int, { nullable: true })
  hasta: number | null;

  @Field(() => Float)
  monto: number;

  @Field(() => Float)
  carteraBanda: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoDiasAtrasoOutput {
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
  totalCartera: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => [CreditoDiasAtrasoRangoOutput])
  rangos: CreditoDiasAtrasoRangoOutput[];
}
