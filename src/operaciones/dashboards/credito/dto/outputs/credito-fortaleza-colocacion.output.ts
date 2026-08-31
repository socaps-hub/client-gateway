import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

import { CreditoFortalezaEnfoque } from '../../enums/credito-fortaleza-enfoque.enum';
import { CreditoFortalezaProductoOutput } from './credito-fortaleza-producto.output';
import { CreditoFortalezaGrupoOutput } from './credito-fortaleza-grupo.output';
import { CreditoFortalezaResumenOutput } from './credito-fortaleza-resumen.output';

@ObjectType()
export class CreditoFortalezaColocacionOutput {
  @Field(() => String)
  oficinaNombre: string;

  @Field(() => Int)
  periodoMes: number;

  @Field(() => Int)
  periodoAnio: number;

  @Field(() => CreditoFortalezaEnfoque)
  enfoque: CreditoFortalezaEnfoque;

  @Field(() => Float)
  totalColocacion: number;

  @Field(() => Int)
  totalPrestamos: number;

  @Field(() => [CreditoFortalezaProductoOutput])
  mayores: CreditoFortalezaProductoOutput[];

  @Field(() => [CreditoFortalezaProductoOutput])
  menores: CreditoFortalezaProductoOutput[];

  @Field(() => CreditoFortalezaGrupoOutput)
  totalMayores: CreditoFortalezaGrupoOutput;

  @Field(() => CreditoFortalezaGrupoOutput)
  totalMenores: CreditoFortalezaGrupoOutput;

  @Field(() => CreditoFortalezaGrupoOutput)
  resto: CreditoFortalezaGrupoOutput;

  @Field(() => CreditoFortalezaResumenOutput)
  resumenAcumulado: CreditoFortalezaResumenOutput;

  @Field(() => CreditoFortalezaResumenOutput)
  resumenMensual: CreditoFortalezaResumenOutput;
}
