import { Module } from '@nestjs/common';
import { CooperativasService } from './cooperativas.service';
import { CooperativasResolver } from './cooperativas.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [CooperativasResolver, CooperativasService],
})
export class CooperativasModule {}
