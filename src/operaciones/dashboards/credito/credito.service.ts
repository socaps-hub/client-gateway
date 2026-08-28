import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../config';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { operacionesPatterns } from '../../../common/constants/operaciones/operacionesPatterns';
import { CreditoMedicionAnualInput } from './dto/inputs/credito-medicion-anual.input';
import { CreditoMedicionAnualOutput } from './dto/outputs/credito-medicion-anual.output';

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
}
