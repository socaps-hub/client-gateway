import { Module } from '@nestjs/common';
import { MigracionService } from './migracion.service';
import { MigracionResolver } from './migracion.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports: [
    NatsModule,
    AwsModule,
  ],
  providers: [MigracionResolver, MigracionService],
})
export class MigracionModule {}
