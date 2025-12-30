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

    getDetalleHallazgosFase1ByMuestra(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.GET_DETALLE_HALLAZGOS_F1_BY_MUESTRA, { muestraId, user });
    }

    getDetalleHallazgosFase1ByMuestraPorCategoria(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.GET_DETALLE_HALLAZGOS_F1_BY_MUESTRA_CATEGORIA, { muestraId, user });
    }

    buildCedulaF1(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.BUILD_CEDULA_F1, { muestraId, user });
    }

    // * FASE 2
    getReporteSeguimientoAnomaliasByMuestra(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.GET_RESULTADOS_SEGUIMIENTO_ANOMALIAS_BY_MUESTRA, { muestraId, user });
    }

    buildCedulaF2(muestraId: number, user: Usuario) {
        return this.client.send(auditoriaCreditoReportesPatterns.BUILD_CEDULA_F2, { muestraId, user });
    }


}
