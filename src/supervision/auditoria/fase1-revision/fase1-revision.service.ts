import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateFase1RevisionInput } from './dto/inputs/credito/create-fase1-revision.input';
import { fase1RevisionPatterns } from 'src/common/constants/auditoria/fase1-revision/fase1RevisionPatterns';

@Injectable()
export class Fase1RevisionService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) {}

    async createOrUpdateFase1( input: CreateFase1RevisionInput, user: Usuario ) {
        return this.client.send( fase1RevisionPatterns.CREATE_OR_UPDATE_FASE1, { input, user });
    }
}
