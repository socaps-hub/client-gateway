import { Field, InputType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';

@InputType()
export class CreditoSociosMayoresSaldosInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;
}
