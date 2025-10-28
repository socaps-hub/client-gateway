import { Module } from '@nestjs/common';
import { AuditoriaSisconcreService } from './auditoria-sisconcre.service';
import { AuditoriaSisconcreResolver } from './auditoria-sisconcre.resolver';
import { NatsModule } from 'src/transports/nats.module';
import { ExcelModule } from 'src/common/excel/excel.module';

@Module({
  imports: [
    NatsModule,
    ExcelModule,
  ],
  providers: [AuditoriaSisconcreResolver, AuditoriaSisconcreService],
})
export class AuditoriaSisconcreModule {}
