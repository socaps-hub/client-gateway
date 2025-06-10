import { Module } from '@nestjs/common';
import { LimitePrudencialService } from './limite-prudencial.service';
import { LimitePrudencialResolver } from './limite-prudencial.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [LimitePrudencialResolver, LimitePrudencialService],
})
export class LimitePrudencialModule {}
