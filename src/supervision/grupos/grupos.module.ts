import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposResolver } from './grupos.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule
  ],
  providers: [GruposResolver, GruposService],
})
export class GruposModule {}
