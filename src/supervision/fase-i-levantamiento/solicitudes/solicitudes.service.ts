import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from 'src/config';
import { CreatePrestamoInput } from './dto/create-solicitud.input';
import { UpdatePrestamoInput } from './dto/update-solicitud.input';
import { solicitudesPatterns } from 'src/common/constants/solicitudes/solicitudesPatterns';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

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

  update(updatePrestamoInput: UpdatePrestamoInput, user: Usuario) {
    return this.client.send(solicitudesPatterns.UPDATE, { updatePrestamoInput, user });
  }

  remove(id: string, user: Usuario) {
    return this.client.send(solicitudesPatterns.REMOVE, { id, user });
  }
}
