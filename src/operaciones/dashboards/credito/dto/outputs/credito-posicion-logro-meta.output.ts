import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoPosicionLogroMetaOficinaOutput {
  @Field(() => String)
  oficinaNumero: string;

  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Float)
  metaMensual: number;

  @Field(() => Float)
  colocacionReal: number;

  @Field(() => Float)
  cumplimientoPorcentaje: number;

  @Field(() => Boolean)
  cumplioMeta: boolean;
}

@ObjectType()
export class CreditoPosicionLogroMetaOutput {
  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [CreditoPosicionLogroMetaOficinaOutput])
  oficinas: CreditoPosicionLogroMetaOficinaOutput[];
}