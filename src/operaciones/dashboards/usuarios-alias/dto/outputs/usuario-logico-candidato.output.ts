import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsuarioLogicoCandidatoOutput {
  @Field(() => String)
  r12Ni: string;

  @Field(() => String)
  nombre: string;

  @Field(() => String)
  rol: string;

  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => Boolean)
  sugerido: boolean;
}
