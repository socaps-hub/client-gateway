import { Module } from '@nestjs/common';
import { AuditoriaSisconcreService } from './auditoria-sisconcre.service';
import { AuditoriaSisconcreResolver } from './auditoria-sisconcre.resolver';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [
    NatsModule,
  ],
  providers: [AuditoriaSisconcreResolver, AuditoriaSisconcreService],
})
export class AuditoriaSisconcreModule {}
