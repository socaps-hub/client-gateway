import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CalificativoBEnum } from '../../../enums/calificativo-b.enum';
import { Calificativo } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion.enum';

@InputType()
export class CreateEvaluacionResumenF1ACreditoInput {
//   @Field(() => Int)
//   @IsNumber()
//   A04Id: number;

  @Field(() => String)
  @IsString()
  A04PSAut: string;

  @Field(() => String)
  @IsString()
  A04Excep: string;

  @Field(() => Int)
  @IsNumber()
  A04Ha: number;

  @Field(() => Int)
  @IsNumber()
  A04PRes: number;

  @Field(() => Int)
  @IsNumber()
  A04MonR: number;

  @Field(() => Calificativo)
  @IsString()
  A04CalA: Calificativo;

  @Field(() => CalificativoBEnum)
  @IsString()
  A04CalB: CalificativoBEnum;

  @Field(() => String)
  @IsString()
  A04Obs: string;

  @Field(() => String)
  @IsString()
  A04Comp: string;

  @Field(() => String)
  @IsString()
  A04FPlzo: string;

  @Field(() => String)
  @IsString()
  A04Resp: string;

  @Field(() => String)
  @IsString()
  A04Aud_id: string;

  // @Field(() => String)
  // @IsString()
  // A04FRev: string;
}
