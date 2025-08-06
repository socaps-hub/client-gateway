import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { reportesPatterns } from 'src/common/constants/reportes/reportesPatterns';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class ReportesSisconcreService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}
    
    getReporteSegmentadoF1( input: FiltroFechasInput ) {
        return this.client.send( reportesPatterns.GET_FASE1_REPORTE_SEGMENTADO, { input });
    }

    getDetalleAnomaliasF1( input: FiltroFechasInput ) {
        return this.client.send( reportesPatterns.GET_FASE1_DETALLE_ANOMALIAS, { input });
    }

}
