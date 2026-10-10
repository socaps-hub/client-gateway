import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadMetasAfiliacionOutput {
  @Field(() => String)
  message: string;

  @Field(() => Int)
  controlId: number;

  @Field(() => Int)
  metasIntegralRegistradas: number;

  @Field(() => Int)
  metasAhorradorMenorRegistradas: number;
}
