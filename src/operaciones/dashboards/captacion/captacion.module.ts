import { Module } from '@nestjs/common';
import { CaptacionService } from './captacion.service';
import { CaptacionResolver } from './captacion.resolver';
import { NatsModule } from '../../../transports/nats.module';

@Module({
  imports: [NatsModule],
  providers: [CaptacionResolver, CaptacionService],
})
export class CaptacionModule {}
