import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';
import { GruposModule } from './grupos/grupos.module';
import { RubrosModule } from './rubros/rubros.module';
import { ElementosModule } from './elementos/elementos.module';
import { FaseILevantamientoModule } from './fase-i-levantamiento/fase-i-levantamiento.module';
import { FaseIiSeguimientoModule } from './fase-ii-seguimiento/fase-ii-seguimiento.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,

    GruposModule,

    RubrosModule,

    ElementosModule,

    FaseILevantamientoModule,

    FaseIiSeguimientoModule,
  ],
  providers: []
})
export class SupervisionModule {}
