import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreditoProductividadBaseInput } from './credito-productividad-base.input';

@InputType()
export class CreditoProductividadEjecutivoInput extends CreditoProductividadBaseInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  ejecutivo: string;
}
