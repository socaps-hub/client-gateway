import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { usuariosPatterns } from 'src/common/constants/usuarios/usuariosPatterns';
import { CreateUsuarioInput } from './dto/inputs/create-usuario.input';
import { UpdateUsuarioInput } from './dto/inputs/update-usuario.input';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createUsuarioInput: CreateUsuarioInput) {
    return this.client.send( usuariosPatterns.CREATE, { createUsuarioInput } );
  }

  findAll(role: ValidRoles, user: Usuario) {
    return this.client.send( usuariosPatterns.GET_ALL, { role, user } );
  }

  findByNI(ni: string, withSucursales: boolean) {
    return this.client.send( usuariosPatterns.GET_BY_NI, { ni, withSucursales: true } )
  }

  findByID(id: string) {
    return this.client.send( usuariosPatterns.GET_BY_ID, { id } );
  }

  update(updateUsuarioInput: UpdateUsuarioInput) {
    return this.client.send( usuariosPatterns.UPDATE, updateUsuarioInput);
  }

  desactivate(id: string) {
    return this.client.send( usuariosPatterns.DESACTIVATE, { id } );
  }

  activate(userNI: string) {
    return this.client.send( usuariosPatterns.ACTIVATE, { userNI } );
  }
}
