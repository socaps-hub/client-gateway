import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateEvaluacionResumenFase4Input } from './dto/inputs/create-evaluacion-resumen-fase4.input';
import { UpdateEvaluacionResumenFase4Input } from './dto/inputs/update-evaluacion-resumen-fase4.input';
import { resumenFase4Patterns } from 'src/common/constants/evaluaciones/resumen/resumen-fase4Patterns';


@Injectable()
export class ResumenFase4Service {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  create(input: CreateEvaluacionResumenFase4Input, user: Usuario) {
    return this.client.send(resumenFase4Patterns.CREATE, { input, user })
  }

  findAll(user: Usuario) {
    return this.client.send(resumenFase4Patterns.FIND_ALL, user)
  }

  findOne(R10P_num: string, user: Usuario) {
    return this.client.send(resumenFase4Patterns.FIND_ONE, { R10P_num, user })
  }

  update(input: UpdateEvaluacionResumenFase4Input, user: Usuario) {
    return this.client.send(resumenFase4Patterns.UPDATE, { input, user })
  }

  deleteByPrestamo(prestamoId: string, user: Usuario) {
    return this.client.send(resumenFase4Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })
  }
}
