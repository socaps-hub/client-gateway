import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../config';
import { operacionesPatterns } from '../../common/constants/operaciones/operacionesPatterns';

import { GetControlesMetasInput } from './dto/inputs/get-controles-metas.input';
import { ControlMetaOutput } from './dto/outputs/control-meta.output';
import { DetalleMetaOutput } from './dto/outputs/detalle-meta.output';

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
}
