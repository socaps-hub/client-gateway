// src/common/dto/boolean-response.object.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BooleanResponse {
  @Field(() => Boolean)
  success: boolean;
}
