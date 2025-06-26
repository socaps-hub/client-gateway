import { Module } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesResolver } from './evaluaciones.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { ResumenModule } from './resumen/resumen.module';

@Module({
  imports: [
    NatsModule,
    ResumenModule,
  ],
  providers: [EvaluacionesResolver, EvaluacionesService],
})
export class EvaluacionesModule {}
