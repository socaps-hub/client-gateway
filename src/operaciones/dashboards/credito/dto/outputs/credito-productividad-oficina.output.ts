import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadColocacionOutput {
  @Field(() => Float)
  monto: number;

  @Field(() => Int)
  numeroPrestamos: number;
}

@ObjectType()
export class CreditoProductividadParticipacionOficinaOutput {
  @Field(() => Float)
  saldoSeleccionado: number;

  @Field(() => Float)
  porcentajeSeleccionado: number;

  @Field(() => Float)
  saldoResto: number;

  @Field(() => Float)
  porcentajeResto: number;
}

@ObjectType()
export class CreditoProductividadOficinaOutput {
  @Field(() => CreditoProductividadColocacionOutput)
  acumulado: CreditoProductividadColocacionOutput;

  @Field(() => CreditoProductividadColocacionOutput)
  delAnio: CreditoProductividadColocacionOutput;

  @Field(() => CreditoProductividadColocacionOutput)
  delMes: CreditoProductividadColocacionOutput;

  @Field(() => Float)
  saldo: number;

  @Field(() => CreditoProductividadParticipacionOficinaOutput)
  participacion: CreditoProductividadParticipacionOficinaOutput;
}
