import { Field, InputType, Int } from '@nestjs/graphql';

import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType({
  isAbstract: true,
})
export class CreditoProductividadBaseInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsOptional()
  @IsString()
  oficina?: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(12)
  periodoMes: number;

  @Field(() => Int)
  @IsInt()
  periodoAnio: number;
}
