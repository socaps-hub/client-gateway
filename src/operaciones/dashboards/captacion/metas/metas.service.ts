import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../../config';
import { operacionesPatterns } from '../../../../common/constants/operaciones/operacionesPatterns';

import { UploadMetasCaptacionInput } from './dto/inputs/upload-metas-captacion.input';
import { UploadMetasCaptacionOutput } from './dto/outputs/upload-metas-captacion.output';

@Injectable()
export class MetasService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public uploadMetasCaptacion(input: UploadMetasCaptacionInput) {
    return this._client.send<UploadMetasCaptacionOutput>(
      operacionesPatterns.UPLOAD_METAS_CAPTACION,
      input,
    );
  }
}
