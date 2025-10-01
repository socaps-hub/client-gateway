import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { reportesSisconcapPatterns } from 'src/common/constants/reportes/reportes-sisconcapPatterns';
import { FiltroFechasInput } from 'src/common/dto/filtro-fechas.input';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Injectable()
export class ReportesService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    getReporteSegmentadoF1(input: FiltroFechasInput, user: Usuario) {
        return this.client.send(reportesSisconcapPatterns.GET_FASE1_REPORTE_SEGMENTADO, { input, user });
    }

}