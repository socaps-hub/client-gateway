import { Field, ID, InputType } from '@nestjs/graphql';

import { ArrayUnique, IsArray, IsUUID } from 'class-validator';

@InputType()
export class SyncProductosCaptacionInfantilesInput {
  @Field(() => ID)
  @IsUUID()
  coopId: string;

  @Field(() => [ID])
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', {
    each: true,
  })
  productosInfantilesIds: string[];
}
