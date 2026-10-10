import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';

@ObjectType()
export class DetalleMetaAfiliacionMontosOutput {
  @Field(() => Int)
  enero: number;

  @Field(() => Int)
  febrero: number;

  @Field(() => Int)
  marzo: number;

  @Field(() => Int)
  abril: number;

  @Field(() => Int)
  mayo: number;

  @Field(() => Int)
  junio: number;

  @Field(() => Int)
  julio: number;

  @Field(() => Int)
  agosto: number;

  @Field(() => Int)
  septiembre: number;

  @Field(() => Int)
  octubre: number;

  @Field(() => Int)
  noviembre: number;

  @Field(() => Int)
  diciembre: number;

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class DetalleMetaAfiliacionSucursalOutput extends DetalleMetaAfiliacionMontosOutput {
  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;
}

@ObjectType()
export class DetalleMetaAfiliacionCategoriaOutput {
  @Field(() => [DetalleMetaAfiliacionSucursalOutput])
  filas: DetalleMetaAfiliacionSucursalOutput[];

  @Field(() => DetalleMetaAfiliacionMontosOutput)
  totales: DetalleMetaAfiliacionMontosOutput;
}

@ObjectType()
export class DetalleMetaAfiliacionOutput {
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

  @Field(() => DetalleMetaAfiliacionCategoriaOutput)
  integral: DetalleMetaAfiliacionCategoriaOutput;

  @Field(() => DetalleMetaAfiliacionCategoriaOutput)
  ahorradorMenor: DetalleMetaAfiliacionCategoriaOutput;
}
