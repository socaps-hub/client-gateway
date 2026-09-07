import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreditoCarteraDistribucionOutput,
  CreditoCarteraDistribucionRangoOutput,
} from '../../common/dto/outputs/credito-cartera-distribucion.output';

@ObjectType()
export class CreditoAmortizacionesVencidasRangoOutput extends CreditoCarteraDistribucionRangoOutput {}

@ObjectType()
export class CreditoAmortizacionesVencidasOutput extends CreditoCarteraDistribucionOutput {
  @Field(() => [CreditoAmortizacionesVencidasRangoOutput])
  rangos: CreditoAmortizacionesVencidasRangoOutput[];
}
