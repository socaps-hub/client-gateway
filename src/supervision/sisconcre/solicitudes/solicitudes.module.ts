import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesResolver } from './solicitudes.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [SolicitudesResolver, SolicitudesService],
})
export class SolicitudesModule {}
