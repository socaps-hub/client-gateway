import { Module } from '@nestjs/common';
import { RubrosService } from './rubros.service';
import { RubrosResolver } from './rubros.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [RubrosResolver, RubrosService],
})
export class RubrosModule {}
