import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { ProductosResolver } from './productos/productos.resolver';
import { ProductosService } from './productos/productos.service';
import { NatsModule } from 'src/transports/nats.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';

@Module({
  imports: [
    ProductosModule,
    UsuariosModule,

    NatsModule,

    LimitePrudencialModule,
  ],
  providers: [ ProductosResolver, ProductosService ]
})
export class SupervisionModule {}
