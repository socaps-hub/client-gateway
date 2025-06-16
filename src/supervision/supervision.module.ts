import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,
  ],
  providers: []
})
export class SupervisionModule {}
