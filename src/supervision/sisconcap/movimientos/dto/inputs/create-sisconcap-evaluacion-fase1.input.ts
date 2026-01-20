import { InputType, Field, ID, Int } from "@nestjs/graphql";
import { IsInt, IsString } from "class-validator";
import { ResFaseI } from "src/supervision/sisconcre/solicitudes/enums/evaluacion.enum";

@InputType()
export class CreateSisconcapEvaluacionFase1Input {
  // @Field(() => Int)
  // @IsInt()
  // R20Folio: number;

  @Field(() => String)
  @IsString()
  R20E_id: string;
  
  @Field(() => ResFaseI)
  @IsString()
  R20Res: ResFaseI;
}