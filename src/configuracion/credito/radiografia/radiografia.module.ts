import { Module } from '@nestjs/common';
import { RadiografiaService } from './radiografia.service';
import { RadiografiaResolver } from './radiografia.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { ExcelModule } from 'src/common/excel/excel.module';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports: [
    NatsModule,
    ExcelModule,
    AwsModule,
  ],
  providers: [RadiografiaResolver, RadiografiaService],
})
export class RadiografiaModule {}
