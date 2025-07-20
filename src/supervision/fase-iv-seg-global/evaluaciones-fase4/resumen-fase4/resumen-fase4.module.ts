import { Module } from '@nestjs/common';
import { ResumenFase4Service } from './resumen-fase4.service';
import { ResumenFase4Resolver } from './resumen-fase4.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [ResumenFase4Resolver, ResumenFase4Service],
})
export class ResumenFase4Module {}
