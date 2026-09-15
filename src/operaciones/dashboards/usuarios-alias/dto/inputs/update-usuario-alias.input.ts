import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUsuarioAliasInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  codigoLogico: string;
}
