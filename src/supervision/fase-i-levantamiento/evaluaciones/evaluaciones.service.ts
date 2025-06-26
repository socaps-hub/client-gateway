import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { evaluacionesFase1Patterns } from 'src/common/constants/evaluaciones/evaluacionesFase1Patterns';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateEvaluacionFase1Input } from './dto/create-evaluacion-fase1.input';
import { UpdateEvaluacionFase1Input } from './dto/update-evaluacion-fase1.input';

@Injectable()
export class EvaluacionesService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(input: CreateEvaluacionFase1Input, user: Usuario) {
    return this.client.send(
      evaluacionesFase1Patterns.CREATE,
      { input, user }
    );
  }

  findAll(prestamoId: string, user: Usuario) {
    return this.client.send(
      evaluacionesFase1Patterns.GET_ALL,
      { prestamoId, user }
    );
  }

  update(input: UpdateEvaluacionFase1Input, user: Usuario) {
    return this.client.send(
      evaluacionesFase1Patterns.UPDATE,
      { input, user }
    );
  }

}
