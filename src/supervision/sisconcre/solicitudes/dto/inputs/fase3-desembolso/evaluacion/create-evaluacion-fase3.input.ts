import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { ResFaseIII } from 'src/supervision/sisconcre/solicitudes/enums/evaluacion-fase3.enum';

@InputType()
export class CreateEvaluacionFase3Input {
  @Field()
  @IsString()
  R09E_id: string;
  
  @Field(() => ResFaseIII)
  @IsString()
  R09Res: ResFaseIII;
}
