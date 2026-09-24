import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';

import { CreditoService } from './credito.service';
import { AuthGraphQLGuard } from '../../../auth/guards/auth-graphql.guard';
import { CreditoColocacionTotalOutput } from './dto/outputs/credito-colocacion-total.output';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { CreditoMedicionAnualOutput } from './dto/outputs/credito-medicion-anual.output';
import { CreditoMedicionAnualInput } from './dto/inputs/credito-medicion-anual.input';
import { CreditoMedicionMensualOutput } from './dto/outputs/credito-medicion-mensual.output';
import { CreditoMedicionMensualInput } from './dto/inputs/credito-medicion-mensual.input';
import { CreditoMedicionTrimestralOutput } from './dto/outputs/credito-medicion-trimestral.output';
import { CreditoMedicionTrimestralInput } from './dto/inputs/credito-medicion-trimestral.input';
import { CreditoFortalezaColocacionOutput } from './dto/outputs/credito-fortaleza-colocacion.output';
import { CreditoFortalezaColocacionInput } from './dto/inputs/credito-fortaleza-colocacion.input';
import { CreditoPosicionLogroMetaOutput } from './dto/outputs/credito-posicion-logro-meta.output';
import { CreditoPosicionLogroMetaInput } from './dto/inputs/credito-posicion-logro-meta.input';
import {
  CreditoCumplimientoMensualColocacionOutput
} from './dto/outputs/credito-cumplimiento-mensual-colocacion.output';
import { CreditoCumplimientoMensualColocacionInput } from './dto/inputs/credito-cumplimiento-mensual-colocacion.input';
import { CreditoComportamientoProductoOutput } from './dto/outputs/credito-comportamiento-producto.output';
import { CreditoComportamientoProductoInput } from './dto/inputs/credito-comportamiento-producto.input';
import { CreditoComportamientoCarteraOutput } from './dto/outputs/credito-comportamiento-cartera.output';
import { CreditoComportamientoCarteraInput } from './dto/inputs/credito-comportamiento-cartera.input';
import { CreditoComposicionCarteraOutput } from './dto/outputs/credito-composicion-cartera.output';
import { CreditoComposicionCarteraInput } from './dto/inputs/credito-composicion-cartera.input';
import { CreditoDiasAtrasoOutput } from './dto/outputs/credito-dias-atraso.output';
import { CreditoDiasAtrasoInput } from './dto/inputs/credito-dias-atraso.input';
import { CreditoAmortizacionesPactadasOutput } from './dto/outputs/credito-amortizaciones-pactadas.output';
import { CreditoAmortizacionesPactadasInput } from './dto/inputs/credito-amortizaciones-pactadas.input';
import { CreditoAmortizacionesVencidasOutput } from './dto/outputs/credito-amortizaciones-vencidas.output';
import { CreditoAmortizacionesVencidasInput } from './dto/inputs/credito-amortizaciones-vencidas.input';
import { CreditoTipoAutorizacionOutput } from './dto/outputs/credito-tipo-autorizacion.output';
import { CreditoTipoAutorizacionInput } from './dto/inputs/credito-tipo-autorizacion.input';
import { CreditoSituacionLegalOutput } from './dto/outputs/credito-situacion-legal.output';
import { CreditoSituacionLegalInput } from './dto/inputs/credito-situacion-legal.input';
import { CreditoTraspasosCarteraVencidaOutput } from './dto/outputs/credito-traspasos-cartera-vencida.output';
import { CreditoTraspasosCarteraVencidaInput } from './dto/inputs/credito-traspasos-cartera-vencida.input';
import {
  CreditoTraspasosCarteraVencidaDetalleOutput
} from './dto/outputs/credito-traspasos-cartera-vencida-detalle.output';
import {
  CreditoTraspasosCarteraVencidaDetalleInput
} from './dto/inputs/credito-traspasos-cartera-vencida-detalle.input';
import { CreditoRentabilidadOutput } from './dto/outputs/credito-rentabilidad.output';
import { CreditoRentabilidadInput } from './dto/inputs/credito-rentabilidad.input';
import { CreditoProductividadEjecutivosFiltrosOutput } from './dto/outputs/credito-productividad-ejecutivo-filtros.output';
import {
  CreditoProductividadEjecutivosFiltrosInput
} from './dto/inputs/credito-productividad-ejecutivos-filtros.input';
import { CreditoProductividadOficinaOutput } from './dto/outputs/credito-productividad-oficina.output';
import { CreditoProductividadOficinaInput } from './dto/inputs/credito-productividad-oficina.input';
import { CreditoProductividadEjecutivoOutput } from './dto/outputs/credito-productividad-ejecutivo.output';
import { CreditoProductividadEjecutivoInput } from './dto/inputs/credito-productividad-ejecutivo.input';
import {
  CreditoProductividadGraficasEjecutivoOutput
} from './dto/outputs/credito-productividad-graficas-ejecutivo.output';
import {
  CreditoProductividadTipoAutorizacionOutput
} from './dto/outputs/credito-productividad-tipo-autorizacion.output';
import { CreditoProductividadTipoPagoOutput } from './dto/outputs/credito-productividad-tipo-pago.output';
import { CreditoProductividadTipoSocioOutput } from './dto/outputs/credito-productividad-tipo-socio.output';
import { CreditoProductividadClasificacionOutput } from './dto/outputs/credito-productividad-clasificacion.output';
import { CreditoProductividadSituacionOutput } from './dto/outputs/credito-productividad-situacion.output';
import { CreditoProductividadComportamientoOutput } from './dto/outputs/credito-productividad-comportamiento.output';
import { CreditoProductividadRankingResumenOutput } from './dto/inputs/credito-productividad-ranking-resumen.output';
import { CreditoProductividadRankingMensualOutput } from './dto/inputs/credito-productividad-ranking-mensual.output';
import { CreditoProductividadRankingPageInput } from './dto/inputs/credito-productividad-ranking-page.input';
import {
  CreditoProductividadRankingAcumuladoOutput
} from './dto/inputs/credito-productividad-ranking-acumulado.output';
import {
  CreditoPersonasRelacionadasCreditosOutput,
  CreditoPersonasRelacionadasResumenOutput,
} from './dto/outputs/credito-personas-relacionadas.output';
import {
  CreditoPersonasRelacionadasCreditosInput,
  CreditoPersonasRelacionadasInput,
} from './dto/inputs/credito-presonas-relacionadas.input';
import { CreditoMayoresSaldosOutput } from './dto/outputs/credito-mayores-saldos.output';
import { CreditoMayoresSaldosInput } from './dto/inputs/credito-mayores-saldos.input';
import { CreditoSociosMayormenteAcreditadosOutput } from './dto/outputs/credito-socios-mayormente-acreditados.output';
import { CreditoSociosMayormenteAcreditadosInput } from './dto/inputs/credito-socio-mayormente-acreditados.input';
import { CreditoSociosMayoresSaldosOutput } from './dto/outputs/credito-socios-mayores-saldos.output';
import { CreditoSociosMayoresSaldosInput } from './dto/inputs/credito-socios-mayores-saldos.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class CreditoResolver {
  constructor(private readonly _creditoService: CreditoService) {}

  @Query(() => CreditoColocacionTotalOutput, {
    name: 'creditoColocacionTotalDashboard',
  })
  async creditoColocacionTotalDashboard(
    @Args('input') input: CreditoColocacionTotalInput,
  ) {
    return this._creditoService.getColocacionTotalDashboard(input);
  }

  @Query(() => CreditoMedicionAnualOutput, {
    name: 'creditoMedicionAnual',
  })
  public getMedicionAnual(
    @Args('input')
    input: CreditoMedicionAnualInput,
  ) {
    return this._creditoService.getMedicionAnual(input);
  }

  @Query(() => CreditoMedicionMensualOutput, {
    name: 'creditoMedicionMensual',
  })
  public getMedicionMensual(
    @Args('input')
    input: CreditoMedicionMensualInput,
  ) {
    return this._creditoService.getMedicionMensual(input);
  }

  @Query(() => CreditoMedicionTrimestralOutput, {
    name: 'creditoMedicionTrimestral',
  })
  public getMedicionTrimestral(
    @Args('input')
    input: CreditoMedicionTrimestralInput,
  ) {
    return this._creditoService.getMedicionTrimestral(input);
  }

  @Query(() => CreditoFortalezaColocacionOutput, {
    name: 'creditoFortalezaColocacion',
  })
  public getFortalezaColocacion(
    @Args('input')
    input: CreditoFortalezaColocacionInput,
  ) {
    return this._creditoService.getFortalezaColocacion(input);
  }

  @Query(() => CreditoPosicionLogroMetaOutput, {
    name: 'creditoPosicionLogroMeta',
  })
  public getPosicionLogroMeta(
    @Args('input')
    input: CreditoPosicionLogroMetaInput,
  ): Observable<CreditoPosicionLogroMetaOutput> {
    return this._creditoService.getPosicionLogroMeta(input);
  }

  @Query(() => CreditoCumplimientoMensualColocacionOutput, {
    name: 'creditoCumplimientoMensualColocacion',
  })
  public getCumplimientoMensualColocacion(
    @Args('input')
    input: CreditoCumplimientoMensualColocacionInput,
  ): Observable<CreditoCumplimientoMensualColocacionOutput> {
    return this._creditoService.getCumplimientoMensualColocacion(input);
  }

  @Query(() => CreditoComportamientoProductoOutput, {
    name: 'creditoComportamientoProducto',
  })
  public getComportamientoProducto(
    @Args('input')
    input: CreditoComportamientoProductoInput,
  ): Observable<CreditoComportamientoProductoOutput> {
    return this._creditoService.getComportamientoProducto(input);
  }

  //   ====================================
  //   CALIDAD DE LA CARTERA
  //   ====================================
  @Query(() => CreditoComportamientoCarteraOutput, {
    name: 'creditoComportamientoCartera',
  })
  public getComportamientoCartera(
    @Args('input') input: CreditoComportamientoCarteraInput,
  ): Observable<CreditoComportamientoCarteraOutput> {
    return this._creditoService.getComportamientoCartera(input);
  }

  @Query(() => CreditoComposicionCarteraOutput, {
    name: 'creditoComposicionCartera',
  })
  public getComposicionCartera(
    @Args('input') input: CreditoComposicionCarteraInput,
  ): Observable<CreditoComposicionCarteraOutput> {
    return this._creditoService.getComposicionCartera(input);
  }

  @Query(() => CreditoDiasAtrasoOutput, {
    name: 'creditoDiasAtraso',
  })
  public getDiasAtraso(
    @Args('input') input: CreditoDiasAtrasoInput,
  ): Observable<CreditoDiasAtrasoOutput> {
    return this._creditoService.getDiasAtraso(input);
  }

  @Query(() => CreditoAmortizacionesPactadasOutput, {
    name: 'creditoAmortizacionesPactadas',
  })
  public getAmortizacionesPactadas(
    @Args('input') input: CreditoAmortizacionesPactadasInput,
  ): Observable<CreditoAmortizacionesPactadasOutput> {
    return this._creditoService.getAmortizacionesPactadas(input);
  }

  @Query(() => CreditoAmortizacionesVencidasOutput, {
    name: 'creditoAmortizacionesVencidas',
  })
  public getAmortizacionesVencidas(
    @Args('input') input: CreditoAmortizacionesVencidasInput,
  ): Observable<CreditoAmortizacionesVencidasOutput> {
    return this._creditoService.getAmortizacionesVencidas(input);
  }

  @Query(() => CreditoTipoAutorizacionOutput, {
    name: 'creditoTipoAutorizacion',
  })
  public getTipoAutorizacion(
    @Args('input') input: CreditoTipoAutorizacionInput,
  ): Observable<CreditoTipoAutorizacionOutput> {
    return this._creditoService.getTipoAutorizacion(input);
  }

  @Query(() => CreditoSituacionLegalOutput, {
    name: 'creditoSituacionLegal',
  })
  public async getSituacionLegal(
    @Args('input') input: CreditoSituacionLegalInput,
  ): Promise<CreditoSituacionLegalOutput> {
    return firstValueFrom(this._creditoService.getSituacionLegal(input));
  }

  @Query(() => CreditoTraspasosCarteraVencidaOutput, {
    name: 'creditoTraspasosCarteraVencida',
  })
  public getTraspasosCarteraVencida(
    @Args('input') input: CreditoTraspasosCarteraVencidaInput,
  ): Observable<CreditoTraspasosCarteraVencidaOutput> {
    return this._creditoService.getTraspasosCarteraVencida(input);
  }

  @Query(() => CreditoTraspasosCarteraVencidaDetalleOutput, {
    name: 'creditoTraspasosCarteraVencidaDetalle',
  })
  public getTraspasosCarteraVencidaDetalle(
    @Args('input') input: CreditoTraspasosCarteraVencidaDetalleInput,
  ): Observable<CreditoTraspasosCarteraVencidaDetalleOutput> {
    return this._creditoService.getTraspasosCarteraVencidaDetalle(input);
  }

  //   ===============================
  //   RENTABILIDAD
  //   ===============================
  @Query(() => CreditoRentabilidadOutput, {
    name: 'creditoRentabilidad',
  })
  public async getRentabilidad(
    @Args('input') input: CreditoRentabilidadInput,
  ): Promise<Observable<CreditoRentabilidadOutput>> {
    return this._creditoService.getRentabilidad(input);
  }

  //   ===============================
  //   PRODUCTIVIDAD - EJECUTIVOS
  //   ===============================
  @Query(() => CreditoProductividadEjecutivosFiltrosOutput, {
    name: 'creditoProductividadEjecutivosFiltros',
  })
  public getProductividadEjecutivosFiltros(
    @Args('input') input: CreditoProductividadEjecutivosFiltrosInput,
  ) {
    return this._creditoService.getProductividadEjecutivosFiltros(input);
  }

  @Query(() => CreditoProductividadOficinaOutput, {
    name: 'creditoProductividadOficina',
  })
  public getProductividadOficina(
    @Args('input') input: CreditoProductividadOficinaInput,
  ) {
    return this._creditoService.getProductividadOficina(input);
  }

  @Query(() => CreditoProductividadEjecutivoOutput, {
    name: 'creditoProductividadEjecutivo',
  })
  public getProductividadEjecutivo(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadEjecutivo(input);
  }

  @Query(() => CreditoProductividadGraficasEjecutivoOutput, {
    name: 'creditoProductividadGraficasEjecutivo',
  })
  public getProductividadGraficasEjecutivo(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadGraficasEjecutivo(input);
  }

  @Query(() => CreditoProductividadTipoAutorizacionOutput, {
    name: 'creditoProductividadTipoAutorizacion',
  })
  public getProductividadTipoAutorizacion(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadTipoAutorizacion(input);
  }

  @Query(() => CreditoProductividadTipoPagoOutput, {
    name: 'creditoProductividadTipoPago',
  })
  public async creditoProductividadTipoPago(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadTipoPago(input);
  }

  @Query(() => CreditoProductividadTipoSocioOutput, {
    name: 'creditoProductividadTipoSocio',
  })
  public getProductividadTipoSocio(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadTipoSocio(input);
  }

  @Query(() => CreditoProductividadClasificacionOutput, {
    name: 'creditoProductividadClasificacion',
  })
  public getProductividadClasificacion(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadClasificacion(input);
  }

  @Query(() => CreditoProductividadSituacionOutput, {
    name: 'creditoProductividadSituacion',
  })
  public getProductividadSituacion(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadSituacion(input);
  }

  @Query(() => CreditoProductividadComportamientoOutput, {
    name: 'creditoProductividadComportamiento',
  })
  public getProductividadComportamiento(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadComportamiento(input);
  }

  @Query(() => CreditoProductividadRankingResumenOutput, {
    name: 'creditoProductividadRankingResumen',
  })
  public getProductividadRankingResumen(
    @Args('input') input: CreditoProductividadEjecutivoInput,
  ) {
    return this._creditoService.getProductividadRankingResumen(input);
  }

  @Query(() => CreditoProductividadRankingMensualOutput, {
    name: 'creditoProductividadRankingMensual',
  })
  public getProductividadRankingMensual(
    @Args('input') input: CreditoProductividadRankingPageInput,
  ) {
    return this._creditoService.getProductividadRankingMensual(input);
  }

  @Query(() => CreditoProductividadRankingAcumuladoOutput, {
    name: 'creditoProductividadRankingAcumulado',
  })
  public getProductividadRankingAcumulado(
    @Args('input') input: CreditoProductividadRankingPageInput,
  ) {
    return this._creditoService.getProductividadRankingAcumulado(input);
  }

  // =================================
  // PERSONAS RELACIONADAS
  // =================================
  @Query(() => CreditoPersonasRelacionadasResumenOutput, {
    name: 'creditoPersonasRelacionadasResumen',
  })
  public creditoPersonasRelacionadasResumen(
    @Args('input') input: CreditoPersonasRelacionadasInput,
  ) {
    return this._creditoService.getPersonasRelacionadasResumen(input);
  }

  @Query(() => CreditoPersonasRelacionadasCreditosOutput, {
    name: 'creditoPersonasRelacionadasCreditos',
  })
  public creditoPersonasRelacionadasCreditos(
    @Args('input') input: CreditoPersonasRelacionadasCreditosInput,
  ) {
    return this._creditoService.getPersonasRelacionadasCreditos(input);
  }

  // ====================================
  // 20+
  // ====================================
  @Query(() => CreditoMayoresSaldosOutput, {
    name: 'creditoMayoresSaldos',
  })
  public creditoMayoresSaldos(@Args('input') input: CreditoMayoresSaldosInput) {
    return this._creditoService.getMayoresSaldos(input);
  }

  @Query(() => CreditoSociosMayormenteAcreditadosOutput, {
    name: 'creditoSociosMayormenteAcreditados',
  })
  public creditoSociosMayormenteAcreditados(
    @Args('input') input: CreditoSociosMayormenteAcreditadosInput,
  ) {
    return this._creditoService.getSociosMayormenteAcreditados(input);
  }

  @Query(() => CreditoSociosMayoresSaldosOutput, {
    name: 'creditoSociosMayoresSaldos',
  })
  public creditoSociosMayoresSaldos(
    @Args('input') input: CreditoSociosMayoresSaldosInput,
  ) {
    return this._creditoService.getSociosMayoresSaldos(input);
  }
}
