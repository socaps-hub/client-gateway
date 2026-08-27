import { Module } from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreditoResolver } from './credito.resolver';
import { NatsModule } from '../../../transports/nats.module';
import { MetasModule } from './metas/metas.module';

@Module({
  imports: [
    NatsModule,
    MetasModule,
  ],
  providers: [CreditoResolver, CreditoService],
})
export class CreditoModule {}
