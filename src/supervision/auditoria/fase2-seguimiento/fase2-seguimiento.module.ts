import { Module } from '@nestjs/common';
import { Fase2SeguimientoService } from './fase2-seguimiento.service';
import { Fase2SeguimientoResolver } from './fase2-seguimiento.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [Fase2SeguimientoResolver, Fase2SeguimientoService],
})
export class Fase2SeguimientoModule {}
