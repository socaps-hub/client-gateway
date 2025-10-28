import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { C01ControlCarga } from './control-carga-radiografia.entity';

@ObjectType()
export class RA01Credito {
  @Field(() => Int)
  RA01Folio: number;

  @Field(() => String)
  RA01NumeroDeCredito: string;

  @Field(() => String)
  RA01Tipo: string;

  @Field(() => String)
  RA01Categoria: string;

  @Field(() => String)
  RA01Finalidad: string;

  @Field(() => String)
  RA01DestinoAgropecuario: string;

  @Field(() => String)
  RA01FormaPago: string;

  @Field(() => String)
  RA01FEntrega: string;

  @Field(() => String)
  RA01FVencimiento: string;

  @Field(() => Float)
  RA01PeriodicidadCapital: number;

  @Field(() => Float)
  RA01PeriodicidadIntereses: number;

  @Field(() => Int)
  RA01Plazo: number;

  @Field(() => String)
  RA01Abonos: string;

  @Field(() => Int)
  RA01CEntregada: number;

  @Field(() => String)
  RA01Microcredito: string;

  @Field(() => String)
  RA01TipoDeAutorizacion: string;

  @Field(() => String)
  RA01UsrAutorizacion: string;

  @Field(() => String)
  RA01UsrSolicitud: string;

  @Field(() => String)
  RA01Sucursal: string;

  @Field(() => Float)
  RA01TasaOrdinaria: number;

  @Field(() => Float)
  RA01TasaMoratoria: number;

  @Field(() => Float)
  RA01EstimacionCapital: number;

  @Field(() => Float)
  RA01EstimacionInteres: number;

  @Field(() => String)
  RA01EstimacionAdicionalPorInteresesEnCarteraVencida: string;

  @Field(() => String)
  RA01OrdenoEprc: string;

  @Field(() => Float)
  RA01TotalEstimado: number;

  @Field(() => Float)
  RA01CalificacionParteCubierta: number;

  @Field(() => Float)
  RA01CalificacionParteExpuesta: number;

  @Field(() => String)
  RA01ParteCubierta: string;

  @Field(() => Float)
  RA01ParteExpuesta: number;

  @Field(() => Float)
  RA01MontoEstPartCubierta: number;

  @Field(() => Float)
  RA01MontoEstPartExpuesta: number;

  @Field(() => String)
  RA01TipoDeCartera: string;

  @Field(() => Float)
  RA01GarantiaHipotecaria: number;

  @Field(() => String)
  RA01Formalizada: string;

  @Field(() => String)
  RA01LibreGravamen: string;

  @Field(() => String)
  RA01FavorSociedad: string;

  @Field(() => String)
  RA01AvaluoActuallizado: string;

  @Field(() => Float)
  RA01DepositoGarantia: number;

  @Field(() => Float)
  RA01GarantiaLiquida: number;

  @Field(() => String)
  RA01CreditoRedescontado: string;

  @Field(() => String)
  RA01InstitucionFuenteRecursos: string;

  @Field(() => Float)
  RA01PorcentajeGarantia: number;

  @Field(() => Float)
  RA01GarantiaPrendaria: number;

  @Field(() => String)
  RA01NumeroCag: string;

  @Field(() => String)
  RA01NumeroDeSocio: string;

  @Field(() => String)
  RA01Nombre: string;

  @Field(() => String)
  RA01RazonSocial: string;

  @Field(() => String)
  RA01Sexo: string;

  @Field(() => String)
  RA01FIngreso: string;

  @Field(() => String)
  RA01FNacimiento: string;

  @Field(() => String)
  RA01SocioRelacionado: string;

  @Field(() => String)
  RA01Calle: string;

  @Field(() => String)
  RA01NoCivico: string;

  @Field(() => String)
  RA01Colonia: string;

  @Field(() => String)
  RA01Ciudad: string;

  @Field(() => String)
  RA01Municipio: string;

  @Field(() => String)
  RA01Estado: string;

  @Field(() => String)
  RA01CodPostal: string;

  @Field(() => String)
  RA01Telefono: string;

  @Field(() => String)
  RA01Marginada: string;

  @Field(() => String)
  RA01GradoEstudios: string;

  @Field(() => String)
  RA01Ocupacion: string;

  @Field(() => String)
  RA01Curp: string;

  @Field(() => String)
  RA01Rfc: string;

  @Field(() => String)
  RA01Riesgo: string;

  @Field(() => Float)
  RA01Ingresos: number;

  @Field(() => Float)
  RA01TendenciaGastos: number;

  @Field(() => Float)
  RA01MontoHaberes: number;

  @Field(() => Float)
  RA01CapitalCobrado: number;

  @Field(() => Float)
  RA01CapitalVencido: number;

  @Field(() => Int)
  RA01AbonosVencidos: number;

  @Field(() => Int)
  RA01DiasMora: number;

  @Field(() => Int)
  RA01DiasParaVencer: number;

  @Field(() => String)
  RA01FechaUltimoPagoCapital: string;

  @Field(() => Float)
  RA01MontoUltPagoCapital: number;

  @Field(() => String)
  RA01FechaUltimoPagoInteres: string;

  @Field(() => Float)
  RA01MontoUltPagoInteres: number;

  @Field(() => String)
  RA01FechaCambioSituacion: string;

  @Field(() => Float)
  RA01InteresMoratorio: number;

  @Field(() => Float)
  RA01InteresMoratorioCobrado: number;

  @Field(() => Float)
  RA01InteresMoratorioCarteraVe: number;

  @Field(() => Float)
  RA01InteresMoratorioCtaOrden: number;

  @Field(() => Float)
  RA01InteresNormal: number;

  @Field(() => Float)
  RA01InteresNormalCobrado: number;

  @Field(() => Float)
  RA01InteresNormalCarteraVe: number;

  @Field(() => Float)
  RA01InteresNormalCtaOrden: number;

  @Field(() => Float)
  RA01InteresProximoAbono: number;

  @Field(() => String)
  RA01FechaProximoAbono: string;

  @Field(() => Float)
  RA01SaldoCapitalCartVig: number;

  @Field(() => Float)
  RA01SaldoCapitalCartVen: number;

  @Field(() => String)
  RA01TipoDeCobranza: string;

  @Field(() => String)
  RA01VigenteOVencido: string;

  @Field(() => String)
  RA01FPrimeramortvencida: string;

  @Field(() => String)
  RA01FConsultaburo: string;

  @Field(() => String)
  RA01SituacionDelCredito: string;

  @Field(() => Float)
  RA01TotalCartera: number;

  @Field(() => Int)
  RA01ControlId: number;

  // Relación con C01ControlCarga
  @Field(() => C01ControlCarga)
  control: C01ControlCarga;
}
