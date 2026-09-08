import { InputType } from '@nestjs/graphql';
import { CreditoCarteraSegmentoInput } from '../../common/dto/inputs/credito-cartera-segmento.input';

@InputType()
export class CreditoTraspasosCarteraVencidaInput extends CreditoCarteraSegmentoInput {}
