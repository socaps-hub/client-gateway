import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { CreditoProductividadRankingSucursalOutput } from './credito-productividad-ranking-resumen.output';

@ObjectType()
export class CreditoProductividadRankingAcumuladoItemOutput {
  @Field(() => Int)
  lugar: number;

  @Field(() => String)
  usuario: string;

  @Field(() => String)
  ejecutivo: string;

  @Field(() => Float)
  total: number;

  @Field(() => [CreditoProductividadRankingSucursalOutput])
  sucursales: CreditoProductividadRankingSucursalOutput[];
}

@ObjectType()
export class CreditoProductividadRankingAcumuladoOutput {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => [CreditoProductividadRankingAcumuladoItemOutput])
  items: CreditoProductividadRankingAcumuladoItemOutput[];
}
