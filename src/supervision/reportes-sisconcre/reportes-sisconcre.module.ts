import { Module } from '@nestjs/common';
import { ReportesSisconcreService } from './reportes-sisconcre.service';
import { ReportesSisconcreResolver } from './reportes-sisconcre.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule
  ],
  providers: [ReportesSisconcreResolver, ReportesSisconcreService],
})
export class ReportesSisconcreModule {}
