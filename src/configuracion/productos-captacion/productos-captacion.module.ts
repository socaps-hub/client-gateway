import { Module } from '@nestjs/common';
import { ProductosCaptacionService } from './productos-captacion.service';
import { ProductosCaptacionResolver } from './productos-captacion.resolver';
import { NatsModule } from '../../transports/nats.module';

@Module({
  imports: [NatsModule],
  providers: [ProductosCaptacionResolver, ProductosCaptacionService],
})
export class ProductosCaptacionModule {}
