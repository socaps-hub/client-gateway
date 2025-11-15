import { Module } from '@nestjs/common';
import { Fase1RevisionService } from './fase1-revision.service';
import { Fase1RevisionResolver } from './fase1-revision.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [Fase1RevisionResolver, Fase1RevisionService],
})
export class Fase1RevisionModule {}
