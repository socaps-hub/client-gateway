import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [UsuariosResolver, UsuariosService],
})
export class UsuariosModule {}
