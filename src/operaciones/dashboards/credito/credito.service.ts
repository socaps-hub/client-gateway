import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../config';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { operacionesPatterns } from '../../../common/constants/operaciones/operacionesPatterns';
import { CreditoMedicionAnualInput } from './dto/inputs/credito-medicion-anual.input';
import { CreditoMedicionAnualOutput } from './dto/outputs/credito-medicion-anual.output';
import { CreditoMedicionMensualInput } from './dto/inputs/credito-medicion-mensual.input';
import { CreditoMedicionMensualOutput } from './dto/outputs/credito-medicion-mensual.output';
import { CreditoMedicionTrimestralInput } from './dto/inputs/credito-medicion-trimestral.input';
import { CreditoMedicionTrimestralOutput } from './dto/outputs/credito-medicion-trimestral.output';
import { CreditoFortalezaColocacionInput } from './dto/inputs/credito-fortaleza-colocacion.input';
import { CreditoFortalezaColocacionOutput } from './dto/outputs/credito-fortaleza-colocacion.output';
import { CreditoPosicionLogroMetaInput } from './dto/inputs/credito-posicion-logro-meta.input';
import { CreditoPosicionLogroMetaOutput } from './dto/outputs/credito-posicion-logro-meta.output';
import {
  CreditoCumplimientoMensualColocacionOutput
} from './dto/outputs/credito-cumplimiento-mensual-colocacion.output';
import { CreditoComportamientoProductoInput } from './dto/inputs/credito-comportamiento-producto.input';
import { CreditoComportamientoProductoOutput } from './dto/outputs/credito-comportamiento-producto.output';
import { CreditoComportamientoCarteraInput } from './dto/inputs/credito-comportamiento-cartera.input';
import { CreditoComportamientoCarteraOutput } from './dto/outputs/credito-comportamiento-cartera.output';
import { CreditoComposicionCarteraInput } from './dto/inputs/credito-composicion-cartera.input';
import { CreditoComposicionCarteraOutput } from './dto/outputs/credito-composicion-cartera.output';
import { CreditoDiasAtrasoInput } from './dto/inputs/credito-dias-atraso.input';
import { CreditoDiasAtrasoOutput } from './dto/outputs/credito-dias-atraso.output';
import { CreditoAmortizacionesPactadasInput } from './dto/inputs/credito-amortizaciones-pactadas.input';
import { CreditoAmortizacionesPactadasOutput } from './dto/outputs/credito-amortizaciones-pactadas.output';
import { CreditoAmortizacionesVencidasInput } from './dto/inputs/credito-amortizaciones-vencidas.input';
import { CreditoAmortizacionesVencidasOutput } from './dto/outputs/credito-amortizaciones-vencidas.output';
import { CreditoTipoAutorizacionInput } from './dto/inputs/credito-tipo-autorizacion.input';
import { CreditoTipoAutorizacionOutput } from './dto/outputs/credito-tipo-autorizacion.output';
import { CreditoSituacionLegalInput } from './dto/inputs/credito-situacion-legal.input';
import { CreditoSituacionLegalOutput } from './dto/outputs/credito-situacion-legal.output';
import { CreditoTraspasosCarteraVencidaInput } from './dto/inputs/credito-traspasos-cartera-vencida.input';
import { CreditoTraspasosCarteraVencidaOutput } from './dto/outputs/credito-traspasos-cartera-vencida.output';
import {
  CreditoTraspasosCarteraVencidaDetalleInput
} from './dto/inputs/credito-traspasos-cartera-vencida-detalle.input';
import {
  CreditoTraspasosCarteraVencidaDetalleOutput
} from './dto/outputs/credito-traspasos-cartera-vencida-detalle.output';
import { CreditoRentabilidadInput } from './dto/inputs/credito-rentabilidad.input';
import { CreditoRentabilidadOutput } from './dto/outputs/credito-rentabilidad.output';
import {
  CreditoProductividadEjecutivosFiltrosInput
} from './dto/inputs/credito-productividad-ejecutivos-filtros.input';
import { CreditoProductividadEjecutivosFiltrosOutput } from './dto/outputs/credito-productividad-ejecutivo-filtros.output';
import { CreditoProductividadOficinaInput } from './dto/inputs/credito-productividad-oficina.input';
import { CreditoProductividadOficinaOutput } from './dto/outputs/credito-productividad-oficina.output';
import { CreditoProductividadEjecutivoInput } from './dto/inputs/credito-productividad-ejecutivo.input';
import { CreditoProductividadEjecutivoOutput } from './dto/outputs/credito-productividad-ejecutivo.output';
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
import { CreditoProductividadRankingPageInput } from './dto/inputs/credito-productividad-ranking-page.input';
import { CreditoProductividadRankingMensualOutput } from './dto/inputs/credito-productividad-ranking-mensual.output';
import {
  CreditoProductividadRankingAcumuladoOutput
} from './dto/inputs/credito-productividad-ranking-acumulado.output';
import { CreditoCumplimientoMensualColocacionInput } from './dto/inputs/credito-cumplimiento-mensual-colocacion.input';

@Injectable()
export class CreditoService {
  constructor(@Inject(NATS_SERVICE) private readonly _client: ClientProxy) {}

  public async getColocacionTotalDashboard(input: CreditoColocacionTotalInput) {
    return this._client.send(operacionesPatterns.GET_COLOCACION_TOTAL_CREDITO, {
      input,
    });
  }

  public getMedicionAnual(input: CreditoMedicionAnualInput) {
    return this._client.send<CreditoMedicionAnualOutput>(
      operacionesPatterns.GET_MEDICION_ANUAL,
      input,
    );
  }

  public getMedicionMensual(input: CreditoMedicionMensualInput) {
    return this._client.send<CreditoMedicionMensualOutput>(
      operacionesPatterns.GET_MEDICION_MENSUAL,
      input,
    );
  }

  public getMedicionTrimestral(input: CreditoMedicionTrimestralInput) {
    return this._client.send<CreditoMedicionTrimestralOutput>(
      operacionesPatterns.GET_MEDICION_TRIMESTRAL,
      input,
    );
  }

  public getFortalezaColocacion(input: CreditoFortalezaColocacionInput) {
    return this._client.send<CreditoFortalezaColocacionOutput>(
      operacionesPatterns.GET_FORTALEZA_COLOCACION,
      input,
    );
  }

  public getPosicionLogroMeta(input: CreditoPosicionLogroMetaInput) {
    return this._client.send<
      CreditoPosicionLogroMetaOutput,
      CreditoPosicionLogroMetaInput
    >(operacionesPatterns.GET_POSICION_LOGRO_META, input);
  }

  public getCumplimientoMensualColocacion(
    input: CreditoCumplimientoMensualColocacionInput,
  ) {
    return this._client.send<
      CreditoCumplimientoMensualColocacionOutput,
      CreditoCumplimientoMensualColocacionInput
    >(operacionesPatterns.GET_CUMPLIMIENTO_MENSUAL_COLOCACION, input);
  }

  public getComportamientoProducto(input: CreditoComportamientoProductoInput) {
    return this._client.send<
      CreditoComportamientoProductoOutput,
      CreditoComportamientoProductoInput
    >(operacionesPatterns.GET_COMPORTAMIENTO_PRODUCTO, input);
  }

  //   ========================================
  //   CALIDAD DE LA CARTERA
  //   ========================================
  public getComportamientoCartera(input: CreditoComportamientoCarteraInput) {
    return this._client.send<
      CreditoComportamientoCarteraOutput,
      CreditoComportamientoCarteraInput
    >(operacionesPatterns.GET_COMPORTAMIENTO_CARTERA, input);
  }

  public getComposicionCartera(input: CreditoComposicionCarteraInput) {
    return this._client.send<
      CreditoComposicionCarteraOutput,
      CreditoComposicionCarteraInput
    >(operacionesPatterns.GET_COMPOSICION_CARTERA, input);
  }

  public getDiasAtraso(input: CreditoDiasAtrasoInput) {
    return this._client.send<CreditoDiasAtrasoOutput, CreditoDiasAtrasoInput>(
      operacionesPatterns.GET_DIAS_ATRASO,
      input,
    );
  }

  public getAmortizacionesPactadas(input: CreditoAmortizacionesPactadasInput) {
    return this._client.send<
      CreditoAmortizacionesPactadasOutput,
      CreditoAmortizacionesPactadasInput
    >(operacionesPatterns.GET_AMORTIZACIONES_PACTADAS, input);
  }

  public getAmortizacionesVencidas(input: CreditoAmortizacionesVencidasInput) {
    return this._client.send<
      CreditoAmortizacionesVencidasOutput,
      CreditoAmortizacionesVencidasInput
    >(operacionesPatterns.GET_AMORTIZACIONES_VENCIDAS, input);
  }

  public getTipoAutorizacion(input: CreditoTipoAutorizacionInput) {
    return this._client.send<
      CreditoTipoAutorizacionOutput,
      CreditoTipoAutorizacionInput
    >(operacionesPatterns.GET_TIPO_AUTORIZACION, input);
  }

  public getSituacionLegal(input: CreditoSituacionLegalInput) {
    return this._client.send<
      CreditoSituacionLegalOutput,
      CreditoSituacionLegalInput
    >(operacionesPatterns.GET_SITUACION_LEGAL, input);
  }

  public getTraspasosCarteraVencida(
    input: CreditoTraspasosCarteraVencidaInput,
  ) {
    return this._client.send<
      CreditoTraspasosCarteraVencidaOutput,
      CreditoTraspasosCarteraVencidaInput
    >(operacionesPatterns.GET_TRASPASOS_CARTERA_VENCIDA, input);
  }

  public getTraspasosCarteraVencidaDetalle(
    input: CreditoTraspasosCarteraVencidaDetalleInput,
  ) {
    return this._client.send<
      CreditoTraspasosCarteraVencidaDetalleOutput,
      CreditoTraspasosCarteraVencidaDetalleInput
    >(operacionesPatterns.GET_TRASPASOS_CARTERA_VENCIDA_DETALLE, input);
  }

  // =================================
  // RENTABILIDAD
  // =================================
  public getRentabilidad(input: CreditoRentabilidadInput) {
    return this._client.send<
      CreditoRentabilidadOutput,
      CreditoRentabilidadInput
    >(operacionesPatterns.GET_RENTABILIDAD, input);
  }

  // =================================
  // PRODUCTIVIDAD - EJECUTIVOS
  // =================================
  public getProductividadEjecutivosFiltros(
    input: CreditoProductividadEjecutivosFiltrosInput,
  ) {
    return this._client.send<CreditoProductividadEjecutivosFiltrosOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_EJECUTIVOS_FILTROS,
      input,
    );
  }

  public getProductividadOficina(input: CreditoProductividadOficinaInput) {
    return this._client.send<CreditoProductividadOficinaOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_OFICINA,
      input,
    );
  }

  public getProductividadEjecutivo(input: CreditoProductividadEjecutivoInput) {
    return this._client.send<CreditoProductividadEjecutivoOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_EJECUTIVO,
      input,
    );
  }

  public getProductividadGraficasEjecutivo(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadGraficasEjecutivoOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_GRAFICAS_EJECUTIVO,
      input,
    );
  }

  public getProductividadTipoAutorizacion(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadTipoAutorizacionOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_TIPO_AUTORIZACION,
      input,
    );
  }

  public async getProductividadTipoPago(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadTipoPagoOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_TIPO_PAGO,
      input,
    );
  }

  public getProductividadTipoSocio(input: CreditoProductividadEjecutivoInput) {
    return this._client.send<CreditoProductividadTipoSocioOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_TIPO_SOCIO,
      input,
    );
  }

  public getProductividadClasificacion(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadClasificacionOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_CLASIFICACION,
      input,
    );
  }

  public getProductividadSituacion(input: CreditoProductividadEjecutivoInput) {
    return this._client.send<CreditoProductividadSituacionOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_SITUACION,
      input,
    );
  }

  public getProductividadComportamiento(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadComportamientoOutput>(
      operacionesPatterns.GET_PRODUCTIVIDAD_COMPORTAMIENTO,
      input,
    );
  }

  public getProductividadRankingResumen(
    input: CreditoProductividadEjecutivoInput,
  ) {
    return this._client.send<CreditoProductividadRankingResumenOutput>(operacionesPatterns.GET_PRODUCTIVIDAD_RANKING_RESUMEN, input);
  }

  public getProductividadRankingMensual(
    input: CreditoProductividadRankingPageInput,
  ) {
    return this._client.send<CreditoProductividadRankingMensualOutput>(operacionesPatterns.GET_PRODUCTIVIDAD_RANKING_MENSUAL, input);
  }

  public getProductividadRankingAcumulado(
    input: CreditoProductividadRankingPageInput,
  ) {
    return this._client.send<CreditoProductividadRankingAcumuladoOutput>(operacionesPatterns.GET_PRODUCTIVIDAD_RANKING_ACUMULADO, input);
  }
}
