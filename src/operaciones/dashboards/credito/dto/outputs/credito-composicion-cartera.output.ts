import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoComposicionCarteraProductoOutput {
  @Field(() => String)
  productoNombre: string;

  @Field(() => String)
  productoCategoria: string;

  @Field(() => Float)
  saldo: number;

  @Field(() => Float)
  vigente: number;

  @Field(() => Float)
  vencida: number;

  @Field(() => Float)
  vigentePorcentaje: number;

  @Field(() => Float)
  vencidaPorcentaje: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Int)
  prestamosVigentes: number;

  @Field(() => Int)
  prestamosVencidos: number;
}

@ObjectType()
export class CreditoComposicionCarteraOutput {
  @Field(() => String, { nullable: true })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoComposicionCarteraProductoOutput])
  productos: CreditoComposicionCarteraProductoOutput[];
}
