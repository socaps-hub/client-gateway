import { CreditoCarteraSegmentoInput } from '../../common/dto/inputs/credito-cartera-segmento.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CreditoAmortizacionesVencidasInput extends CreditoCarteraSegmentoInput {}
