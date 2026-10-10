import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../config';
import { operacionesPatterns } from '../../common/constants/operaciones/operacionesPatterns';

import { GetControlesMetasInput } from './dto/inputs/get-controles-metas.input';
import { ControlMetaOutput } from './dto/outputs/control-meta.output';
import { DetalleMetaOutput } from './dto/outputs/detalle-meta.output';
import { DetalleMetaCaptacionOutput } from './dto/outputs/detalle-meta-captacion.output';
import { DetalleMetaAfiliacionOutput } from './dto/outputs/detalle-meta-afiliacion.output';

@Injectable()
export class MetasService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public getControlesMetas(input: GetControlesMetasInput) {
    return this._client.send<ControlMetaOutput[]>(
      operacionesPatterns.GET_CONTROLES_METAS,
      input,
    );
  }

  public getDetalleMeta(controlId: number) {
    return this._client.send<DetalleMetaOutput>(
      operacionesPatterns.GET_DETALLE_META,
      {
        controlId,
      },
    );
  }

  public getDetalleMetaCaptacion(controlId: number) {
    return this._client.send<DetalleMetaCaptacionOutput>(
      operacionesPatterns.GET_DETALLE_META_CAPTACION,
      { controlId },
    );
  }

  public getDetalleMetaAfiliacion(controlId: number) {
    return this._client.send<DetalleMetaAfiliacionOutput>(
      operacionesPatterns.GET_DETALLE_META_AFILIACION,
      { controlId },
    );
  }
}
