import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteUsuarioAliasOutput {
  @Field(() => Int)
  id: number;

  @Field(() => Boolean)
  deleted: boolean;
}
