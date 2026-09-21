import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadSituacionItemOutput {
  @Field(()  => String)
  categoria: string;

  @Field(() => Float)
  colocacionAcumulada: number;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  porcentaje: number;

  @Field(() => Float)
  saldo: number;
}

@ObjectType()
export class CreditoProductividadSituacionGrupoOutput {
  @Field(() => Float)
  totalColocacionAcumulada: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => [CreditoProductividadSituacionItemOutput])
  items: CreditoProductividadSituacionItemOutput[];
}

@ObjectType()
export class CreditoProductividadSituacionOutput {
  @Field(() => Float)
  totalColocacionAcumulada: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => CreditoProductividadSituacionGrupoOutput)
  carteraVigente: CreditoProductividadSituacionGrupoOutput;

  @Field(() => CreditoProductividadSituacionGrupoOutput)
  carteraVencida: CreditoProductividadSituacionGrupoOutput;
}