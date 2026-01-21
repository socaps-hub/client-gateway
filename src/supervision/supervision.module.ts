import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';
import { GruposModule } from './grupos/grupos.module';
import { RubrosModule } from './rubros/rubros.module';
import { ElementosModule } from './elementos/elementos.module';
import { ReportesSisconcreModule } from './reportes-sisconcre/reportes-sisconcre.module';
import { SisconcapModule } from './sisconcap/sisconcap.module';
import { AuditoriaSisconcreModule } from './auditoria-sisconcre/auditoria-sisconcre.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { SisconcreModule } from './sisconcre/sisconcre.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,

    GruposModule,

    RubrosModule,

    ElementosModule,

    ReportesSisconcreModule,

    SisconcapModule,

    AuditoriaSisconcreModule,

    AuditoriaModule,

    SisconcreModule,
  ],
  providers: []
})
export class SupervisionModule {}
