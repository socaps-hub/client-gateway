import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class CreditoMayoresSaldosInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;
}
