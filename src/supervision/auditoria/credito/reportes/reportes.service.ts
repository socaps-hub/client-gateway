import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { auditoriaCreditoReportesPatterns } from 'src/common/constants/auditoria/credito/reportes/auditoriaCreditoReportesPatterns';

@Injectable()
export class ReportesService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // * FASE 1
    getReporteFase1ByMuestra(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.GET_REPORTE_F1_BY_MUESTRA, { muestraId, user });
    }

    getReporteFase1ByClasificacion(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.GET_REPORTE_F1_BY_CLASIFICACION, { muestraId, user });
    }

}
