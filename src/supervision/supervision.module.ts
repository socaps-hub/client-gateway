import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { LimitePrudencialModule } from './limite-prudencial/limite-prudencial.module';
import { GruposModule } from './grupos/grupos.module';
import { RubrosModule } from './rubros/rubros.module';
import { ElementosModule } from './elementos/elementos.module';
import { FaseILevantamientoModule } from './fase-i-levantamiento/fase-i-levantamiento.module';
import { FaseIiSeguimientoModule } from './fase-ii-seguimiento/fase-ii-seguimiento.module';
import { FaseIiiDesembolsoModule } from './fase-iii-desembolso/fase-iii-desembolso.module';
import { FaseIvSegGlobalModule } from './fase-iv-seg-global/fase-iv-seg-global.module';
import { ReportesSisconcreModule } from './reportes-sisconcre/reportes-sisconcre.module';
import { SisconcapModule } from './sisconcap/sisconcap.module';
import { AuditoriaSisconcreModule } from './auditoria-sisconcre/auditoria-sisconcre.module';

@Module({
  imports: [
    NatsModule,

    LimitePrudencialModule,

    GruposModule,

    RubrosModule,

    ElementosModule,

    FaseILevantamientoModule,

    FaseIiSeguimientoModule,

    FaseIiiDesembolsoModule,

    FaseIvSegGlobalModule,

    ReportesSisconcreModule,

    SisconcapModule,

    AuditoriaSisconcreModule,
  ],
  providers: []
})
export class SupervisionModule {}
