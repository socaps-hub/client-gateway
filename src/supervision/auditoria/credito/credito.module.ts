import { Module } from '@nestjs/common';
import { CreditoService } from './credito.service';
import { CreditoResolver } from './credito.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    NatsModule,
    ReportesModule,
  ],
  providers: [CreditoResolver, CreditoService],
})
export class CreditoModule {}
