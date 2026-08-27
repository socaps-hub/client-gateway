import { Module } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasResolver } from './metas.resolver';
import { NatsModule } from '../../transports/nats.module';
import { AwsModule } from '../../common/aws/aws.module';

@Module({
  imports: [
    NatsModule,
    AwsModule,
  ],
  providers: [MetasResolver, MetasService],
})
export class MetasModule {}
