import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadProduccionProductoOutput {
  @Field()
  producto: string;

  @Field()
  tipo: string;

  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;
}

@ObjectType()
export class CreditoProductividadProduccionMesOutput {
  @Field(() => Float)
  totalMonto: number;

  @Field(() => Int)
  totalPrestamos: number;

  @Field(() => [CreditoProductividadProduccionProductoOutput])
  productos: CreditoProductividadProduccionProductoOutput[];
}

@ObjectType()
export class CreditoProductividadRankingMensualResumenOutput {
  @Field(() => Int)
  lugar: number;

  @Field(() => Int)
  totalEjecutivos: number;

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
export class CreditoProductividadRankingSucursalOutput {
  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => Float)
  monto: number;
}

@ObjectType()
export class CreditoProductividadRankingAcumuladoResumenOutput {
  @Field(() => Int)
  lugar: number;

  @Field(() => Int)
  totalEjecutivos: number;

  @Field(() => String)
  usuario: string;

  @Field()
  ejecutivo: string;

  @Field(() => Float)
  total: number;

  @Field(() => [CreditoProductividadRankingSucursalOutput])
  sucursales: CreditoProductividadRankingSucursalOutput[];
}

@ObjectType()
export class CreditoProductividadRankingResumenOutput {
  @Field(() => CreditoProductividadProduccionMesOutput)
  produccionMes: CreditoProductividadProduccionMesOutput;

  @Field(() => CreditoProductividadRankingMensualResumenOutput)
  rankingMensual: CreditoProductividadRankingMensualResumenOutput;

  @Field(() => CreditoProductividadRankingAcumuladoResumenOutput)
  rankingAcumulado: CreditoProductividadRankingAcumuladoResumenOutput;
}
