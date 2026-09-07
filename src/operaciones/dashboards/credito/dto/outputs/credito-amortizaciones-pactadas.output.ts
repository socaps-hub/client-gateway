import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreditoCarteraDistribucionOutput,
  CreditoCarteraDistribucionRangoOutput,
} from '../../common/dto/outputs/credito-cartera-distribucion.output';

@ObjectType()
export class CreditoAmortizacionesPactadasRangoOutput extends CreditoCarteraDistribucionRangoOutput {}

@ObjectType()
export class CreditoAmortizacionesPactadasOutput extends CreditoCarteraDistribucionOutput {
  @Field(() => [CreditoAmortizacionesPactadasRangoOutput])
  rangos: CreditoAmortizacionesPactadasRangoOutput[];
}
