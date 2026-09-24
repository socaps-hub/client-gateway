import { Field, InputType } from '@nestjs/graphql';

import { IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreditoSociosMayoresSaldosInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  cag?: string;
}
