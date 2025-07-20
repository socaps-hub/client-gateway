import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { evaluacionFase4Patterns } from 'src/common/constants/evaluaciones/evaluacionFase4Patterns';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateEvaluacionFase4Input } from './dto/inputs/create-evaluacion-fase4.input';
import { UpdateEvaluacionFase4Input } from './dto/inputs/update-evaluacion-fase4.input';

@Injectable()
export class EvaluacionesFase4Service {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
) {}

  createMany(inputs: CreateEvaluacionFase4Input[], user: Usuario){
    return this.client.send(evaluacionFase4Patterns.CREATE_MANY, { inputs, user })    
  }

  findAll(prestamoId: string, user: Usuario) {
    return this.client.send(evaluacionFase4Patterns.FIND_ALL, { prestamoId, user })    
  }

  update(input: UpdateEvaluacionFase4Input) {
    return this.client.send(evaluacionFase4Patterns.UPDATE, { input })    
  }

  deleteByPrestamo(prestamoId: string, user: Usuario){
    return this.client.send(evaluacionFase4Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })    
  }
}
