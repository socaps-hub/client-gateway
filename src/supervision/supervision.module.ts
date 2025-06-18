import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';
import { GruposModule } from './grupos/grupos.module';
import { RubrosModule } from './rubros/rubros.module';
import { ElementosModule } from './elementos/elementos.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,

    GruposModule,

    RubrosModule,

    ElementosModule,
  ],
  providers: []
})
export class SupervisionModule {}
