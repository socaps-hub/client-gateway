import { IsString, IsUUID } from 'class-validator';
import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { ResFaseII } from 'src/supervision/fase-ii-seguimiento/evaluaciones-fase2/enums/evaluacion-fase2.enum';

@InputType()
export class CreateEvaluacionF2ACreditoInput {
  @Field(() => ID)
  @IsUUID()
  A05E_id: string;

  @Field(() => ResFaseII)
  @IsString()
  A05Res: ResFaseII;
}
