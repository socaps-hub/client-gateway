import { Module } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesResolver } from './evaluaciones.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [EvaluacionesResolver, EvaluacionesService],
})
export class EvaluacionesModule {}
