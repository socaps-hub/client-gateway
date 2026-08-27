import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';
import { DetalleMetaSucursalOutput } from './detalle-meta-sucursal.output';
import { DetalleMetaTotalesOutput } from './detalle-meta-totales.output';

@ObjectType()
export class DetalleMetaOutput {
  @Field(() => Int)
  controlId: number;

  @Field(() => String)
  cooperativaId: string;

  @Field(() => String)
  cooperativaNombre: string;

  @Field(() => OpMetaAreaEnum)
  area: OpMetaAreaEnum;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => [DetalleMetaSucursalOutput])
  filas: DetalleMetaSucursalOutput[];

  @Field(() => DetalleMetaTotalesOutput)
  totales: DetalleMetaTotalesOutput;
}
