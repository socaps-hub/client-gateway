import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoFortalezaProductoOutput {
  @Field(() => String)
  productoNombre: string;

  @Field(() => Float)
  colocacion: number;

  @Field(() => Int)
  prestamos: number;

  @Field(() => Float)
  porcentaje: number;
}
