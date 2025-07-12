import { Module } from '@nestjs/common';
import { ResumenFase2Service } from './resumen-fase2.service';
import { ResumenFase2Resolver } from './resumen-fase2.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [ResumenFase2Resolver, ResumenFase2Service],
})
export class ResumenFase2Module {}
