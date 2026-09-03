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
import { Observable } from 'rxjs';
import { CreditoPosicionLogroMetaOutput } from './dto/outputs/credito-posicion-logro-meta.output';
import { CreditoCumplimientoMensualColocacionInput } from './dto/inputs/credito-cumplimiento-mensual-colocacion.input';
import {
  CreditoCumplimientoMensualColocacionOutput
} from './dto/outputs/credito-cumplimiento-mensual-colocacion.output';
import { CreditoComportamientoProductoInput } from './dto/inputs/credito-comportamiento-producto.input';
import { CreditoComportamientoProductoOutput } from './dto/outputs/credito-comportamiento-producto.output';
import { CreditoComportamientoCarteraInput } from './dto/inputs/credito-comportamiento-cartera.input';
import { CreditoComportamientoCarteraOutput } from './dto/outputs/credito-comportamiento-cartera.output';
import { CreditoComposicionCarteraInput } from './dto/inputs/credito-composicion-cartera.input';
import { CreditoComposicionCarteraOutput } from './dto/outputs/credito-composicion-cartera.output';

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

  public getComposicionCartera(
    input: CreditoComposicionCarteraInput,
  ) {
    return this._client.send<CreditoComposicionCarteraOutput, CreditoComposicionCarteraInput>( operacionesPatterns.GET_COMPOSICION_CARTERA, input );
  }
}
