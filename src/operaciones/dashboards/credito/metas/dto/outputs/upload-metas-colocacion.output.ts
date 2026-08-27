import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadMetasColocacionOutput {
  @Field(() => String)
  message: string;

  @Field(() => Int)
  controlId: number;

  @Field(() => Int)
  metasRegistradas: number;
}
