import { Module } from '@nestjs/common';
import { EvaluacionesFase4Service } from './evaluaciones-fase4.service';
import { EvaluacionesFase4Resolver } from './evaluaciones-fase4.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { ResumenFase4Module } from './resumen-fase4/resumen-fase4.module';

@Module({
  imports: [
    ResumenFase4Module,
    NatsModule,
  ],
  providers: [EvaluacionesFase4Resolver, EvaluacionesFase4Service],
})
export class EvaluacionesFase4Module {}
