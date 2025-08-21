import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { reportesPatterns } from 'src/common/constants/reportes/reportesPatterns';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { HistoricoFiltroInput } from './dto/historicos/inputs/filtro-historico-reporte.input';

@Injectable()
export class ReportesSisconcreService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}
    
    getReporteSegmentadoF1( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE1_REPORTE_SEGMENTADO, { input, user });
    }

    getDetalleAnomaliasF1( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE1_DETALLE_ANOMALIAS, { input, user });
    }

    getDetalleAnomaliasInteralF1( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE1_DETALLE_ANOMALIAS_INTEGRAL, { input, user });
    }

    getDetalleAnomaliasPorEjecutivoF1( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE1_DETALLE_ANOMALIAS_EJECUTIVOS, { input, user });
    }

    getDetalleAnomaliasIntegralPorEjecutivoF1( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE1_DETALLE_ANOMALIAS_EJECUTIVOS_INTEGRAL, { input, user });
    }

    // * FASE 2
    getResultadosSeguimientoF2( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE2_RESULTADOS_SEGUIMIENTO, { input, user });
    }

    // * FASE 3
    getRevisionDesembolsosF3( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE3_REVISION_DESEMBOLSOS, { input, user });
    }
    
    getDetalleAnomaliasF3( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE3_DETALLE_ANOMALIAS_F3, { input, user });
    }

    // * FASE 4
    getReporteGlobalF4( input: FiltroFechasInput , user: Usuario) {
        return this.client.send( reportesPatterns.GET_FASE4_REPORTE_GLOBAL, { input, user });
    }
    
    // * HISTORICOS
    getHistoricos(input: HistoricoFiltroInput, user: Usuario) {
        return this.client.send(reportesPatterns.GET_HISTORICOS, { input, user });
    }

}
