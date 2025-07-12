import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateEvaluacionFase2Input } from './dto/inputs/create-evaluacion-fase2.input';
import { UpdateEvaluacionFase2Input } from './dto/inputs/update-evaluacion-fase2.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { evaluacionesFase2Patterns } from 'src/common/constants/evaluaciones/evaluacionesFase2Patterns';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class EvaluacionesFase2Service {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    createMany(
        inputs: CreateEvaluacionFase2Input[],
        user: Usuario
    ) {
        return this.client.send<boolean>(evaluacionesFase2Patterns.CREATE_MANY, { inputs, user })
    }

    findAll(prestamoId: string, user: Usuario) {
        return this.client.send(evaluacionesFase2Patterns.FIND_ALL, { prestamoId, user })
    }

    update(
        input: UpdateEvaluacionFase2Input,
        user: Usuario
    ) {
        return this.client.send(evaluacionesFase2Patterns.UPDATE, { input, user })
    }

    deleteByPrestamo(
        prestamoId: string,
        user: Usuario
    ) {
        return this.client.send(evaluacionesFase2Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })
    }
}
