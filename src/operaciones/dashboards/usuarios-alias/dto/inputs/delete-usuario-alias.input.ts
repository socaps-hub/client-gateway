import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsUUID } from 'class-validator';

@InputType()
export class DeleteUsuarioAliasInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => String)
  @IsUUID()
  cooperativaId: string;
}
