import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoProductividadEjecutivoOptionOutput {
  @Field(() => String)
  codigo: string;

  @Field(() => String)
  nombre: string;
}

@ObjectType()
export class CreditoProductividadEjecutivosFiltrosOutput {
  @Field(() => [CreditoProductividadEjecutivoOptionOutput])
  ejecutivos: CreditoProductividadEjecutivoOptionOutput[];
}