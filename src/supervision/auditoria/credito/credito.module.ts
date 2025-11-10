import { Module } from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreditoResolver } from './credito.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [CreditoResolver, CreditoService],
})
export class CreditoModule {}
