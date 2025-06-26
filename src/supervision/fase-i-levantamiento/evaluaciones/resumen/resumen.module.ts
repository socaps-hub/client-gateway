import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ResumenFase1Resolver } from './resumen.resolver';
import { ResumenFase1Service } from './resumen.service';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [ResumenFase1Resolver, ResumenFase1Service],
})
export class ResumenModule {}
