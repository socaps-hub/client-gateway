import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadComportamientoItemOutput {
  @Field(() => Int)
  mes: number;

  @Field(() => Float)
  colocacionAcumulada: number;

  @Field(() => Float)
  colocacionMensual: number;
}

@ObjectType()
export class CreditoProductividadComportamientoOutput {
  @Field(() => [CreditoProductividadComportamientoItemOutput])
  periodos: CreditoProductividadComportamientoItemOutput[];
}
