import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoTipoAutorizacionDistribucionOutput {
  @Field(() => String)
  tipo: string;

  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoTipoAutorizacionSegmentoOutput {
  @Field(() => Float)
  totalCartera: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => [CreditoTipoAutorizacionDistribucionOutput])
  distribucion: CreditoTipoAutorizacionDistribucionOutput[];
}

@ObjectType()
export class CreditoTipoAutorizacionOutput {
  @Field(() => String, { nullable: true })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => String, { nullable: true })
  productoId: string | null;

  @Field(() => String, { nullable: true })
  productoNombre: string | null;

  @Field(() => String, { nullable: true })
  productoCategoria: string | null;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => CreditoTipoAutorizacionSegmentoOutput)
  oficina: CreditoTipoAutorizacionSegmentoOutput;

  @Field(() => CreditoTipoAutorizacionSegmentoOutput, { nullable: true })
  producto: CreditoTipoAutorizacionSegmentoOutput | null;
}
