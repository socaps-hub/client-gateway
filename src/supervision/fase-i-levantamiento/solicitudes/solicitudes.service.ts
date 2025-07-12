import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { CreatePrestamoInput } from './dto/create-solicitud.input';
import { UpdatePrestamoInput } from './dto/update-solicitud.input';
import { solicitudesPatterns } from 'src/common/constants/solicitudes/solicitudesPatterns';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateEvaluacionFase1Input } from '../evaluaciones/dto/create-evaluacion-fase1.input';
import { CreateResumenFase1Input } from '../evaluaciones/resumen/dto/create-resumen-fase1.input';
import { ValidEstados } from './enums/valid-estados.enum';

@Injectable()
export class SolicitudesService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  create(createPrestamoInput: CreatePrestamoInput, user: Usuario) {
    return this.client.send(solicitudesPatterns.CREATE, { createPrestamoInput, user });
  }

  findAll(user: Usuario) {
    return this.client.send(solicitudesPatterns.GET_ALL, { user });
  }

  findById(id: string, user: Usuario) {
    return this.client.send(solicitudesPatterns.GET_BY_ID, { id, user });
  }

  findByEstado(estado: ValidEstados, user: Usuario) {
    return this.client.send(solicitudesPatterns.GET_BY_ESTADO, { estado, user })
  }

  update(updatePrestamoInput: UpdatePrestamoInput, user: Usuario) {
    return this.client.send(solicitudesPatterns.UPDATE, { updatePrestamoInput, user });
  }

  updateAll(
    payload: {
      currentId: string
      prestamo: UpdatePrestamoInput;
      evaluaciones: CreateEvaluacionFase1Input[];
      resumen: CreateResumenFase1Input;
      user: Usuario;
    }
  ) {
    return this.client.send(solicitudesPatterns.UPDATE_ALL, payload );
  }

  remove(id: string, user: Usuario) {
    return this.client.send(solicitudesPatterns.REMOVE, { id, user });
  }
}
