import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreditoMedicionAnualInput {
  @Field(() => String)
  @IsUUID()
  cooperativaId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(12)
  periodoMes: number;

  @Field(() => Int)
  @IsInt()
  @Min(2000)
  periodoAnio: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  oficina?: string;
}
