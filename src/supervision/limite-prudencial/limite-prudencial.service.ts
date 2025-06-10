import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateLimitePrudencialInput } from './dto/inputs/create-limite-prudencial.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { limitePrudencialPatterns } from 'src/common/constants/limite-prudencial/limite-prudencialPatterns';

@Injectable()
export class LimitePrudencialService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createLimitePrudencialInput: CreateLimitePrudencialInput, user: Usuario) {
    return this.client.send( limitePrudencialPatterns.CREATE, { createLimitePrudencialInput, user } );
  }

  findLast(usuario: Usuario) {
    return this.client.send( limitePrudencialPatterns.GET_LAST, { usuario } );
  }

}
