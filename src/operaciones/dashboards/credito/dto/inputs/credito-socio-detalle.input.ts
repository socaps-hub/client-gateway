import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreditoSocioDetalleInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  cag: string;
}
