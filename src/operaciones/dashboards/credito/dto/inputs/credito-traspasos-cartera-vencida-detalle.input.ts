import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreditoCarteraSegmentoInput } from '../../common/dto/inputs/credito-cartera-segmento.input';

@InputType()
export class CreditoTraspasosCarteraVencidaDetalleInput extends CreditoCarteraSegmentoInput {
  @Field(() => Int)
  @IsInt()
  page: number;

  @Field(() => Int)
  @IsInt()
  pageSize: number;
}
