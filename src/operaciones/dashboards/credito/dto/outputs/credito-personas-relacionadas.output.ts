import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreditoPersonaRelacionadaCategoriaOutput {
  @Field(() => String)
  codigo: string;

  @Field(() => String)
  tipoRelacion: string;

  @Field(() => Int)
  numeroPrestamos: number;

  @Field(() => Float)
  entrega: number;

  @Field(() => Float)
  porcentajeEntrega: number;

  @Field(() => Float)
  saldo: number;

  @Field(() => Float)
  porcentajeSaldo: number;
}

@ObjectType()
export class CreditoPersonasRelacionadasResumenOutput {
  @Field(() => Int)
  totalPrestamos: number;

  @Field(() => Float)
  totalEntrega: number;

  @Field(() => Float)
  totalSaldo: number;

  @Field(() => [CreditoPersonaRelacionadaCategoriaOutput])
  categorias: CreditoPersonaRelacionadaCategoriaOutput[];
}

@ObjectType()
export class CreditoPersonaRelacionadaOutput {
  @Field(() => String)
  prestamo: string;

  @Field(() => String)
  cag: string;

  @Field(() => String)
  socio: string;

  @Field(() => String)
  sucursalNumero: string;

  @Field(() => String)
  sucursalNombre: string;

  @Field(() => Float)
  entrega: number;

  @Field(() => Float)
  saldo: number;

  @Field(() => String)
  categoria: string;

  @Field(() => String)
  clasificacion: string;

  @Field(() => String)
  tipoRelacion: string;

  @Field(() => String)
  fechaEntrega: string;

  @Field(() => String)
  fechaVencimiento: string;

  @Field(() => Int)
  plazo: number;

  @Field(() => String)
  abonos: string;

  @Field(() => String)
  situacion: string;

  @Field(() => Float)
  tasaOrdinaria: number;

  @Field(() => Float)
  capitalVigente: number;

  @Field(() => Float)
  capitalVencido: number;
}

@ObjectType()
export class CreditoPersonasRelacionadasCreditosOutput {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => [CreditoPersonaRelacionadaOutput])
  items: CreditoPersonaRelacionadaOutput[];
}