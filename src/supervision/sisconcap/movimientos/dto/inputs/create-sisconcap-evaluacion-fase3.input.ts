import { IsString } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { ResFaseII } from "src/supervision/sisconcre/solicitudes/enums/evaluacion-fase2.enum";

@InputType()
export class CreateSisconcapEvaluacionFase3Input {
  @Field(() => String)
  @IsString()
  R24E_id: string;
  
  @Field(() => ResFaseII)
  @IsString()
  R24Res: ResFaseII;
}
