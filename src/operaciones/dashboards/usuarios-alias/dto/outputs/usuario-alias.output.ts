import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsuarioAliasOutput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  cooperativaId: string;

  @Field(() => String)
  codigoLogico: string;

  @Field(() => String)
  nombreLogico: string;

  @Field(() => String)
  r12Ni: string;

  @Field(() => String)
  nombreVariante: string;

  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => String)
  creadoEn: string;

  @Field(() => String)
  actualizadoEn: string;
}
