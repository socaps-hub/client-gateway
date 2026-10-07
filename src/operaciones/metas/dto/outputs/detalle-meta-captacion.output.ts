import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OpMetaAreaEnum } from '../../../enums/op-meta-area.enum';

@ObjectType()
export class DetalleMetaCaptacionMontosOutput {
  @Field(() => Float)
  enero: number;

  @Field(() => Float)
  febrero: number;

  @Field(() => Float)
  marzo: number;

  @Field(() => Float)
  abril: number;

  @Field(() => Float)
  mayo: number;

  @Field(() => Float)
  junio: number;

  @Field(() => Float)
  julio: number;

  @Field(() => Float)
  agosto: number;

  @Field(() => Float)
  septiembre: number;

  @Field(() => Float)
  octubre: number;

  @Field(() => Float)
  noviembre: number;

  @Field(() => Float)
  diciembre: number;

  @Field(() => Float)
  total: number;
}

@ObjectType()
export class DetalleMetaCaptacionSucursalOutput {
  @Field(() => String, {
    nullable: true,
  })
  sucursalNumero: string | null;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => DetalleMetaCaptacionMontosOutput)
  vista: DetalleMetaCaptacionMontosOutput;

  @Field(() => DetalleMetaCaptacionMontosOutput)
  plazo: DetalleMetaCaptacionMontosOutput;

  @Field(() => DetalleMetaCaptacionMontosOutput)
  infantil: DetalleMetaCaptacionMontosOutput;
}

@ObjectType()
export class DetalleMetaCaptacionOutput {
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

  @Field(() => [DetalleMetaCaptacionSucursalOutput])
  filas: DetalleMetaCaptacionSucursalOutput[];
}
