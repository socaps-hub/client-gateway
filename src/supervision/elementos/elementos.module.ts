import { Module } from '@nestjs/common';
import { ElementosService } from './elementos.service';
import { ElementosResolver } from './elementos.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [ElementosResolver, ElementosService],
})
export class ElementosModule {}
