import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoCumplimientoMensualColocacionMesOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Float)
  meta: number;

  @Field(() => Float, {
    nullable: true,
  })
  colocacion: number | null;

  @Field(() => Boolean)
  disponible: boolean;
}

@ObjectType()
export class CreditoCumplimientoMensualColocacionOutput {
  @Field(() => String, {
    nullable: true,
  })
  oficinaNumero: string | null;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoCumplimientoMensualColocacionMesOutput])
  meses: CreditoCumplimientoMensualColocacionMesOutput[];
}