import { Inject, Injectable } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../../config';

import { operacionesPatterns } from '../../../../common/constants/operaciones/operacionesPatterns';
import { UploadMetasAfiliacionInput } from './dto/inputs/upload-metas-afiliacion.input';
import { UploadMetasAfiliacionOutput } from './dto/outputs/upload-metas-afiliacion.output';

@Injectable()
export class MetasService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public uploadMetasAfiliacion(input: UploadMetasAfiliacionInput) {
    return this._client.send<UploadMetasAfiliacionOutput>(
      operacionesPatterns.UPLOAD_METAS_AFILIACION,
      input,
    );
  }
}
