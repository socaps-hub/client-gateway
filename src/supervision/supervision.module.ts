import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';
import { GruposModule } from './grupos/grupos.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,

    GruposModule,
  ],
  providers: []
})
export class SupervisionModule {}
