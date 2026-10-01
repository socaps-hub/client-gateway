import { Module } from '@nestjs/common';
import { CategoriasCaptacionService } from './categorias-captacion.service';
import { CategoriasCaptacionResolver } from './categorias-captacion.resolver';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  providers: [CategoriasCaptacionResolver, CategoriasCaptacionService],
})
export class CategoriasCaptacionModule {}
