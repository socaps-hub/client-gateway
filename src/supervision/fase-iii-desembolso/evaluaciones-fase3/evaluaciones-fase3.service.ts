import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateEvaluacionFase3Input } from './dto/inputs/create-evaluacion-fase3.input';
import { UpdateEvaluacionFase3Input } from './dto/inputs/update-evaluacion-fase3.input';
import { evaluacionFase3Patterns } from 'src/common/constants/evaluaciones/evaluacionesFase3Patterns';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class EvaluacionFase3Service {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    createMany(
        inputs: CreateEvaluacionFase3Input[],
        user: Usuario
    ) {
        return this.client.send(evaluacionFase3Patterns.CREATE_MANY, { inputs, user })
    }

    findAll(prestamoId: string, user: Usuario) {
        return this.client.send(evaluacionFase3Patterns.FIND_ALL, { prestamoId, user })
    }

    update(input: UpdateEvaluacionFase3Input, user: Usuario) {
        return this.client.send(evaluacionFase3Patterns.UPDATE, { input, user })
    }

    deleteByPrestamo(
        prestamoId: string,
        user: Usuario
    ) {
        return this.client.send(evaluacionFase3Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })
    }
}
