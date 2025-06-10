import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasResolver } from './categorias.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [CategoriasResolver, CategoriasService],
})
export class CategoriasModule {}
