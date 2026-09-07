import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreditoCarteraDistribucionOutput,
  CreditoCarteraDistribucionRangoOutput,
} from '../../common/dto/outputs/credito-cartera-distribucion.output';

@ObjectType()
export class CreditoDiasAtrasoRangoOutput extends CreditoCarteraDistribucionRangoOutput {}

@ObjectType()
export class CreditoDiasAtrasoOutput extends CreditoCarteraDistribucionOutput {
  @Field(() => [CreditoDiasAtrasoRangoOutput])
  rangos: CreditoDiasAtrasoRangoOutput[];
}
