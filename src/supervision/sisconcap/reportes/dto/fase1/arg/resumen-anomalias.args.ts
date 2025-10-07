import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { MovimientoEnum } from 'src/supervision/sisconcap/movimientos/enums/movimiento.enum';

@ArgsType()
export class ResumenAnomaliasArgs {
  @Field(() => MovimientoEnum, { nullable: false })
  @IsString()
  categoria: MovimientoEnum;
  
  @Field(() => String, { nullable: false })
  @IsString()
  sucursal: string;

  @Field(() => FiltroFechasInput, { nullable: false })
  @ValidateNested()
  @Type(() => FiltroFechasInput)
  filtro: FiltroFechasInput;
}
