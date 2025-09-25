import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { movimientosPatterns } from 'src/common/constants/movimientos/movimientosPatterns';
import { ValidEstados } from 'src/supervision/fase-i-levantamiento/solicitudes/enums/valid-estados.enum';
import { UpdateMovimientoArgs } from './dto/inputs/update-movimiento.input';
import { CreateFase1Input } from './dto/inputs/create-fase1.input';
import { CreateFase2Input } from './dto/inputs/create-fase2.input';
import { CreateFase3Input } from './dto/inputs/create-fase3.input';

@Injectable()
export class MovimientosService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    createFase1( input: CreateFase1Input, user: Usuario ) {        
        return this.client.send( movimientosPatterns.CREATE_FASE1, { input, user } )
    }

    createOrUpdateFase2( input: CreateFase2Input, user: Usuario ) {
        return this.client.send( movimientosPatterns.CREATE_OR_UPDATE_FASE2, { input, user } )
    }

    createOrUpdateFase3( input: CreateFase3Input, user: Usuario ) {
        return this.client.send( movimientosPatterns.CREATE_OR_UPDATE_FASE3, { input, user } )
    }

    getAll( user: Usuario, filterBySucursal: boolean = true ) {
        return this.client.send( movimientosPatterns.GET_ALL, { user, filterBySucursal } )
    }

    getByFolio( folio: number, user: Usuario ) {
        return this.client.send( movimientosPatterns.GET_BY_FOLIO, { folio, user } )
    }

    findByEstado(estado: ValidEstados, user: Usuario, filterBySucursal: boolean = true) {
        return this.client.send( movimientosPatterns.GET_BY_ESTADO, { estado, user, filterBySucursal } )
    }

    updateFase1( input: UpdateMovimientoArgs, user: Usuario ){
        return this.client.send( movimientosPatterns.UPDATE_MOVIMIENTO_F1, { input, user } )
    }

    remove(folio: number, user: Usuario) {
        return this.client.send( movimientosPatterns.REMOVE, { folio, user } )
    }

}
