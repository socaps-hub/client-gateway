import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CreateResumenFase1Input } from './dto/create-resumen-fase1.input';
import { UpdateResumenFase1Input } from './dto/update-resumen-fase1.input';
import { EvaluacionResumenFase1 } from './entities/resumen-fase1.entity';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { resumenFase1Patterns } from 'src/common/constants/evaluaciones/resumen/resumen-fase1Patterns';

@Injectable()
export class ResumenFase1Service {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
) {}

  async create(input: CreateResumenFase1Input, user: Usuario) {
    return this.client.send(resumenFase1Patterns.CREATE, { input, user })
  }

  async findAll(user: Usuario) {
    return this.client.send(resumenFase1Patterns.GET_ALL, { user }) 
  }

  async findOne(R06P_num: string, user: Usuario) {
    return this.client.send(resumenFase1Patterns.GET_BY_ID, { R06P_num, user }) 
  }

  async update(input: UpdateResumenFase1Input, user: Usuario) {
    return this.client.send(resumenFase1Patterns.UPDATE, { input, user }) 
  }
}
