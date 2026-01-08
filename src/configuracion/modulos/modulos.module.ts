import { Module } from '@nestjs/common';
import { ModulosService } from './modulos.service';
import { ModulosResolver } from './modulos.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule
  ],
  providers: [ModulosResolver, ModulosService],
})
export class ModulosModule {}
