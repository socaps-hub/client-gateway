import { Module } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { SucursalesResolver } from './sucursales.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [SucursalesResolver, SucursalesService],
})
export class SucursalesModule {}
