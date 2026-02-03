import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { reportesSisconcapPatterns } from 'src/common/constants/reportes/reportes-sisconcapPatterns';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ResumenAnomaliasArgs } from './dto/fase1/arg/resumen-anomalias.args';
import { SisconcapHistoricoFiltroInput } from './dto/historicos/inputs/filtro-historico-reporte.input';

@Injectable()
export class ReportesService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    // * FASE 1
    getReporteSegmentadoF1(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE1_REPORTE_SEGMENTADO, { input, user });
    }

    getResumenAnomaliasSucAndEjecutivos(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE1_RESUMEN_ANOMALIAS_SUC_EJECUTIVOS, { input, user });
    }

    getResumenAnomaliasEjecutivosPorSucursal(
        resumenAnomaliasArgs: ResumenAnomaliasArgs,
        user: Usuario,
    ) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE1_RESUMEN_ANOMALIAS_EJECUTIVOS_POR_SUC, { resumenAnomaliasArgs, user });
    }

    getResumenAnomaliasEjecutivosGlobal(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE1_RESUMEN_ANOMALIAS_EJECUTIVOS_GLOBAL, { input, user });
    }

    // * FASE 2
    getResultadosSeguimiento(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE2_RESULTADOS_SEGUIMIENTO, { input, user });
    }

    // * FASE 3
    getResultadosFinales(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE3_RESULTADOS_FINALES, { input, user });
    }

    // * HISTORICO
    getHistorico(input: SisconcapHistoricoFiltroInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_HISTORICO, { input, user });
    }

    // * BALANCE
    getBalance(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_BALANCE, { input, user });
    }

}