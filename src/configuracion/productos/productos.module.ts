import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [
    ProductosResolver, 
    ProductosService
  ],
})
export class ProductosModule {}
