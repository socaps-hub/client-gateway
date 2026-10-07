import { Module } from '@nestjs/common';
import { CaptacionService } from './captacion.service';
import { CaptacionResolver } from './captacion.resolver';
import { NatsModule } from '../../../transports/nats.module';
import { MetasModule } from './metas/metas.module';

@Module({
  imports: [NatsModule, MetasModule],
  providers: [CaptacionResolver, CaptacionService],
})
export class CaptacionModule {}
