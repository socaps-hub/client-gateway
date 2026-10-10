import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class UploadMetasAfiliacionInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => Int)
  @IsInt()
  @Min(2000)
  periodoAnio: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  s3Key: string;
}
