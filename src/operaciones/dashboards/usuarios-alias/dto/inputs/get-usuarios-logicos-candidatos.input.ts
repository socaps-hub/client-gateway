import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class GetUsuariosLogicosCandidatosInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  r12Ni: string;
}
