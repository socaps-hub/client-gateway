import { Inject, Injectable } from '@nestjs/common';
import { NATS_SERVICE } from '../../../config';
import { ClientProxy } from '@nestjs/microservices';
import { CreditoColocacionTotalInput } from './dto/inputs/credito-colocacion-total.input';
import { operacionesPatterns } from '../../../common/constants/operaciones/operacionesPatterns';

@Injectable()
export class CreditoService {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  public async getColocacionTotalDashboard(input: CreditoColocacionTotalInput) {
    return this.client.send(operacionesPatterns.GET_COLOCACION_TOTAL_CREDITO, { input });
  }
}
