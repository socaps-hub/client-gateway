import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosResolver } from './movimientos.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [MovimientosResolver, MovimientosService],
})
export class MovimientosModule {}
