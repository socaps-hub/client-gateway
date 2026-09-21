import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadEjecutivoColocacionOutput {
  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentaje: number;
}

@ObjectType()
export class CreditoProductividadEjecutivoOutput {
  @Field(() => CreditoProductividadEjecutivoColocacionOutput)
  delMes: CreditoProductividadEjecutivoColocacionOutput;

  @Field(() => CreditoProductividadEjecutivoColocacionOutput)
  delAnio: CreditoProductividadEjecutivoColocacionOutput;

  @Field(() => CreditoProductividadEjecutivoColocacionOutput)
  acumulado: CreditoProductividadEjecutivoColocacionOutput;

  @Field(() => Float)
  saldo: number;
}
