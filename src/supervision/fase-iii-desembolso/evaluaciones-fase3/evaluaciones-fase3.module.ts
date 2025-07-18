import { Module } from '@nestjs/common';
import { EvaluacionesFase3Resolver } from './evaluaciones-fase3.resolver';
import { EvaluacionFase3Service } from './evaluaciones-fase3.service';
import { NatsModule } from 'src/transports/nats.module';
import { ResumenFase3Module } from './resumen-fase3/resumen-fase3.module';

@Module({
  imports: [
    ResumenFase3Module,
    NatsModule,
  ],
  providers: [EvaluacionesFase3Resolver, EvaluacionFase3Service],
})
export class EvaluacionesFase3Module {}
