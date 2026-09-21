import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadRankingMensualItemOutput {
  @Field(() => Int)
  lugar: number;

  @Field(() => String)
  usuario: string;

  @Field(() => String)
  ejecutivo: string;

  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;
}

@ObjectType()
export class CreditoProductividadRankingMensualOutput {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => [CreditoProductividadRankingMensualItemOutput])
  items: CreditoProductividadRankingMensualItemOutput[];
}
