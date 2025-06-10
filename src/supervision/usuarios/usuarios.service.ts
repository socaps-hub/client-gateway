import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { Usuario } from 'src/supervision/usuarios/entities/usuario.entity';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { usuariosPatterns } from 'src/common/constants/usuarios/usuariosPatterns';
import { CreateUsuarioInput } from './dto/inputs/create-usuario.input';

@Injectable()
export class UsuariosService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createUsuarioInput: CreateUsuarioInput, usuario: Usuario) {
    return this.client.send( usuariosPatterns.CREATE, { createUsuarioInput, usuario } );
  }

  findAll(role: ValidRoles, usuario: Usuario) {
    return this.client.send( usuariosPatterns.GET_ALL, { role, usuario } );
  }

  findByNI(ni: string, withSucursales: boolean) {
    return this.client.send( usuariosPatterns.GET_BY_NI, { ni, withSucursales: true } )
  }

  findByID(id: string) {
    return this.client.send( usuariosPatterns.GET_BY_ID, { id } );
  }

  desactivate(id: string) {
    return this.client.send( usuariosPatterns.DESACTIVATE, { id } );
  }

  activate(userNI: string) {
    return this.client.send( usuariosPatterns.ACTIVATE, { userNI } );
  }
}
