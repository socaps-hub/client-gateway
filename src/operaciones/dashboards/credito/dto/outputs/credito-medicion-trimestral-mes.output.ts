import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoMedicionTrimestralMesOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float, {
    nullable: true,
  })
  capitalColocado: number | null;

  @Field(() => Boolean)
  disponible: boolean;
}
