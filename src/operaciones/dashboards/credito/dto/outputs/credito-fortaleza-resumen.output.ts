import { Field, ObjectType } from '@nestjs/graphql';
import { CreditoFortalezaGrupoOutput } from './credito-fortaleza-grupo.output';

@ObjectType()
export class CreditoFortalezaResumenOutput {
  @Field(() => CreditoFortalezaGrupoOutput)
  totalMayores: CreditoFortalezaGrupoOutput;

  @Field(() => CreditoFortalezaGrupoOutput)
  totalMenores: CreditoFortalezaGrupoOutput;

  @Field(() => CreditoFortalezaGrupoOutput)
  resto: CreditoFortalezaGrupoOutput;
}
