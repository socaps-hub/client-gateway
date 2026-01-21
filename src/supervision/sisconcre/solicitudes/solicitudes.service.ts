import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { SisConCreCreateFase1Input } from './dto/inputs/fase1-levantamiento/create-fase1.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { solicitudesPatterns } from 'src/common/constants/solicitudes/solicitudesPatterns';
import { InventarioSolicitudesFilterInput } from './dto/inputs/solicitudes/inventario-solicitudes-filter.input';
import { UpdatePrestamoInput } from './dto/inputs/solicitudes/update-solicitud.input';
import { ValidEstados } from './enums/valid-estados.enum';
import { UpdateAllPrestamoArgs } from './dto/args/update-all-prestamo.arg';
import { SisConCreCreateFase2Input } from './dto/inputs/fase2-seguimiento/create-fase2input';
import { SisConCreCreateFase3Input } from './dto/inputs/fase3-desembolso/create-fase3.input';
import { SisConCreCreateFase4Input } from './dto/inputs/fase4-seguimiento-global/create-or-update-fase4.input';

@Injectable()
export class SolicitudesService {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    // * FASE ACTIONS
    createFase1(input: SisConCreCreateFase1Input, user: Usuario) {
        return this.client.send(solicitudesPatterns.CREATE_F1, { input, user })
    }

    updateAll( input: UpdateAllPrestamoArgs, user: Usuario ) {
        return this.client.send(solicitudesPatterns.UPDATE_ALL, { input, user });
    }

    createOrUpdateFase2(input: SisConCreCreateFase2Input, user: Usuario) {
        return this.client.send(solicitudesPatterns.CREATE_OR_UPDATE_F2, { input, user })
    }

    createOrUpdateFase3(input: SisConCreCreateFase3Input, user: Usuario) {
        return this.client.send(solicitudesPatterns.CREATE_OR_UPDATE_F3, { input, user })
    }

    createOrUpdateFase4(input: SisConCreCreateFase4Input, user: Usuario) {
        return this.client.send(solicitudesPatterns.CREATE_OR_UPDATE_F4, { input, user })
    }

    pasoMasivoAFase4(user: Usuario){
    return this.client.send(solicitudesPatterns.PASO_MASIVO_F4, user )    
    }

    getInventarioSolicitudesFiltrado(input: InventarioSolicitudesFilterInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_INVENTARIO_SOLICITUDES, { input, user });
    }

    findById(id: string, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_BY_ID, { id, user });
    }

    findByEstado(estado: ValidEstados, user: Usuario, filterBySucursal: boolean = true) {
        return this.client.send(solicitudesPatterns.GET_BY_ESTADO, { estado, user, filterBySucursal })
    }

    update(updatePrestamoInput: UpdatePrestamoInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.UPDATE, { updatePrestamoInput, user });
    }    

    remove(id: string, user: Usuario) {
        return this.client.send(solicitudesPatterns.REMOVE, { id, user });
    }

    getInventarioSolicitudesStats(input: InventarioSolicitudesFilterInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_INVENTARIO_SOLICITUDES_STATS, { input, user });
    }

    getInventarioSeguimientosStats(input: InventarioSolicitudesFilterInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_INVENTARIO_SEGUIMIENTOS_STATS, { input, user });
    }

    getInventarioDesembolsosStats(input: InventarioSolicitudesFilterInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_INVENTARIO_DESEMBOLSOS_STATS, { input, user });
    }

    getInventarioSeguimientoGlobalStats(input: InventarioSolicitudesFilterInput, user: Usuario) {
        return this.client.send(solicitudesPatterns.GET_INVENTARIO_SEGUIMIENTO_GLOBAL_STATS, { input, user });
    }

}
