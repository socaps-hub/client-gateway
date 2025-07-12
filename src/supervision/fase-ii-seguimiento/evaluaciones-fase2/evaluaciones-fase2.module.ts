import { Module } from '@nestjs/common';
import { EvaluacionesFase2Service } from './evaluaciones-fase2.service';
import { EvaluacionesFase2Resolver } from './evaluaciones-fase2.resolver';
import { ResumenFase2Module } from './resumen-fase2/resumen-fase2.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  providers: [EvaluacionesFase2Resolver, EvaluacionesFase2Service],
  imports: [
    ResumenFase2Module,

    NatsModule
  ],
})
export class EvaluacionesFase2Module {}
