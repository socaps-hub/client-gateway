import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { CaptacionPeriodoInput } from './dto/inputs/captacion-periodo.input';
import { NATS_SERVICE } from '../../../config';
import { CaptacionTablaSaldosOutput } from './dto/outputs/saldos/captacion-tabla-saldos.output';
import { operacionesPatterns } from '../../../common/constants/operaciones/operacionesPatterns';
import { CaptacionBaseInput } from './dto/inputs/captacion-base.input';
import { CaptacionPosicionOutput } from './dto/outputs/saldos/captacion-posicion.output';
import { CaptacionComposicionOutput } from './dto/outputs/saldos/captacion-composicion.output';
import { CaptacionProductoInput } from './dto/inputs/captacion-producto.input';
import { CaptacionProductosAnalisisOutput } from './dto/outputs/saldos/captacion-productos-analisis.output';
import { CaptacionCumplimientoPresupuestoInput } from './dto/inputs/captacion-cumplimiento-presupuesto.input';
import {
  CaptacionCumplimientoPresupuestoOutput
} from './dto/outputs/cumplimiento-metas/captacion-cumplimiento-presupuesto.output';

@Injectable()
export class CaptacionService {
  constructor(@Inject(NATS_SERVICE) private readonly _client: ClientProxy) {}

  //   ====================================
  //   SALDOS
  //   ====================================
  public getTablaSaldos(
    input: CaptacionPeriodoInput,
  ): Observable<CaptacionTablaSaldosOutput> {
    return this._client.send<CaptacionTablaSaldosOutput, CaptacionPeriodoInput>(
      operacionesPatterns.GET_TABLA_SALDOS,
      input,
    );
  }

  public getPosicion(
    input: CaptacionBaseInput,
  ): Observable<CaptacionPosicionOutput> {
    return this._client.send<CaptacionPosicionOutput, CaptacionBaseInput>(
      operacionesPatterns.GET_POSICION_CAPTACION,
      input,
    );
  }

  public getComposicion(
    input: CaptacionBaseInput,
  ): Observable<CaptacionComposicionOutput> {
    return this._client.send<CaptacionComposicionOutput, CaptacionBaseInput>(
      operacionesPatterns.GET_COMPOSICION_CAPTACION,
      input,
    );
  }

  public getCuentasVista(
    input: CaptacionProductoInput,
  ): Observable<CaptacionProductosAnalisisOutput> {
    return this._client.send<
      CaptacionProductosAnalisisOutput,
      CaptacionProductoInput
    >(operacionesPatterns.GET_CUENTAS_VISTA_CAPTACION, input);
  }

  public getCuentasPlazo(
    input: CaptacionProductoInput,
  ): Observable<CaptacionProductosAnalisisOutput> {
    return this._client.send<
      CaptacionProductosAnalisisOutput,
      CaptacionProductoInput
    >(operacionesPatterns.GET_CUENTAS_PLAZO_CAPTACION, input);
  }

  //   ====================================
  //   CUMPLIMIENTO-METAS
  //   ====================================
  public getCumplimientoPresupuesto(
    input: CaptacionCumplimientoPresupuestoInput,
  ): Observable<CaptacionCumplimientoPresupuestoOutput> {
    return this._client.send<
      CaptacionCumplimientoPresupuestoOutput,
      CaptacionCumplimientoPresupuestoInput
    >(operacionesPatterns.CUMPLIMIENTO_PRESUPUESTO, input);
  }
}
