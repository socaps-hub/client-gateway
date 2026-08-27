import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../../config';
import { UploadMetasColocacionInput } from './dto/inputs/upload-metas-colocacion.input';
import { UploadMetasColocacionOutput } from './dto/outputs/upload-metas-colocacion.output';
import { operacionesPatterns } from '../../../../common/constants/operaciones/operacionesPatterns';

@Injectable()
export class MetasService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public uploadMetasColocacion(input: UploadMetasColocacionInput) {
    return this._client.send<UploadMetasColocacionOutput>(
      operacionesPatterns.UPLOAD_METAS_COLOCACION,
      input,
    );
  }
}
