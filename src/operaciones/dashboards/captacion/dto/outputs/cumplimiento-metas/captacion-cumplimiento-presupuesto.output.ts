import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CaptacionPresupuestoResumenOutput {
  @Field(() => Float)
  metaAnual: number;

  @Field(() => Float)
  cifraEsperada: number;

  @Field(() => Float, { nullable: true })
  avanceEsperado: number | null;

  @Field(() => Float, { nullable: true })
  llevan: number | null;

  @Field(() => Float, { nullable: true })
  cumplimientoEsperado: number | null;

  @Field(() => Float, { nullable: true })
  cumplimientoMetaAnual: number | null;

  @Field(() => Float, { nullable: true })
  diferenciaEsperado: number | null;
}

@ObjectType()
export class CaptacionPresupuestoMensualOutput {
  @Field(() => Float)
  meta: number;

  @Field(() => Float, { nullable: true })
  logro: number | null;

  @Field(() => Float, { nullable: true })
  cumplimiento: number | null;

  @Field(() => Float, { nullable: true })
  diferencia: number | null;
}

@ObjectType()
export class CaptacionPresupuestoComportamientoOutput {
  @Field(() => Int)
  mes: number;

  @Field(() => Float)
  meta: number;

  @Field(() => Float, { nullable: true })
  logro: number | null;
}

@ObjectType()
export class CaptacionCumplimientoPresupuestoOutput {
  @Field(() => CaptacionPresupuestoResumenOutput)
  resumen: CaptacionPresupuestoResumenOutput;

  @Field(() => CaptacionPresupuestoMensualOutput)
  mensual: CaptacionPresupuestoMensualOutput;

  @Field(() => [CaptacionPresupuestoComportamientoOutput])
  comportamiento: CaptacionPresupuestoComportamientoOutput[];
}
