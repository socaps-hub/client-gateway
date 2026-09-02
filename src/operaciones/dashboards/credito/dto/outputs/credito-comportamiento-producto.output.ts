import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoComportamientoProductoMesOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float, {
    nullable: true,
  })
  colocacion: number | null;

  @Field(() => Boolean)
  disponible: boolean;
}

@ObjectType()
export class CreditoComportamientoProductoExtremoOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float)
  colocacion: number;
}

@ObjectType()
export class CreditoComportamientoProductoOutput {
  @Field(() => String, {
    nullable: true,
  })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => String)
  productoCategoria: string;

  @Field(() => String)
  productoNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoComportamientoProductoMesOutput])
  meses: CreditoComportamientoProductoMesOutput[];

  @Field(() => CreditoComportamientoProductoExtremoOutput, {
    nullable: true,
  })
  masAlto: CreditoComportamientoProductoExtremoOutput | null;

  @Field(() => CreditoComportamientoProductoExtremoOutput, {
    nullable: true,
  })
  masBajo: CreditoComportamientoProductoExtremoOutput | null;
}