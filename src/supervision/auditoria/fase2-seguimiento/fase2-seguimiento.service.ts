import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateFase2SeguimientoInput } from './dto/inputs/credito/create-fase2-seguimiento.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { fase2SeguimientoPatterns } from 'src/common/constants/auditoria/fase2-seguimiento/fase2SeguimientoPatterns';

@Injectable()
export class Fase2SeguimientoService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    async createOrUpdateFase2( input: CreateFase2SeguimientoInput, user: Usuario ) {
        return this.client.send( fase2SeguimientoPatterns.CREATE_OR_UPDATE_FASE2, { input, user });
    }

}
