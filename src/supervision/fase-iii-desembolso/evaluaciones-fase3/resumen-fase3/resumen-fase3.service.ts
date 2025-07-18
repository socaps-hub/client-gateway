import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { resumenFase3Patterns } from 'src/common/constants/evaluaciones/resumen/resumen-fase3Patterns';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateEvaluacionResumenFase3Input } from './dtos/inputs/create-resumen-fase3.input';
import { UpdateEvaluacionResumenFase3Input } from './dtos/inputs/update-resumen-fase3.input';


@Injectable()
export class ResumenFase3Service {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  create(input: CreateEvaluacionResumenFase3Input, user: Usuario) {
    return this.client.send(resumenFase3Patterns.CREATE, { input, user })
  }

  findAll(user: Usuario) {
    return this.client.send(resumenFase3Patterns.FIND_ALL, user)
  }

  findOne(R10P_num: string, user: Usuario) {
    return this.client.send(resumenFase3Patterns.FIND_ONE, { R10P_num, user })
  }

  update(input: UpdateEvaluacionResumenFase3Input, user: Usuario) {
    return this.client.send(resumenFase3Patterns.UPDATE, { input, user })
  }

  deleteByPrestamo(prestamoId: string, user: Usuario) {
    return this.client.send(resumenFase3Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })
  }
}
