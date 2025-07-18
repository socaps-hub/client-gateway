import { Module } from '@nestjs/common';
import { ResumenFase3Service } from './resumen-fase3.service';
import { ResumenFase3Resolver } from './resumen-fase3.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [ResumenFase3Resolver, ResumenFase3Service],
})
export class ResumenFase3Module {}
