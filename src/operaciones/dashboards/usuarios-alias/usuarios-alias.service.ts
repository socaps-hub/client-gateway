import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { NATS_SERVICE } from '../../../config';
import { CreateUsuarioAliasInput } from './dto/inputs/create-usuario-alias.input';
import { UsuarioAliasOutput } from './dto/outputs/usuario-alias.output';
import { GetUsuariosAliasInput } from './dto/inputs/get-usuarios-alias.input';
import { UpdateUsuarioAliasInput } from './dto/inputs/update-usuario-alias.input';
import { DeleteUsuarioAliasInput } from './dto/inputs/delete-usuario-alias.input';
import { DeleteUsuarioAliasOutput } from './dto/outputs/delete-usuario-alias.output';
import { operacionesPatterns } from '../../../common/constants/operaciones/operacionesPatterns';
import { GetUsuariosLogicosCandidatosInput } from './dto/inputs/get-usuarios-logicos-candidatos.input';
import { UsuarioLogicoCandidatoOutput } from './dto/outputs/usuario-logico-candidato.output';

@Injectable()
export class UsuariosAliasService {
  constructor(@Inject(NATS_SERVICE) private readonly _client: ClientProxy) {}

  public createUsuarioAlias(input: CreateUsuarioAliasInput) {
    return this._client.send<UsuarioAliasOutput>(
      operacionesPatterns.CREATE_USUARIO_ALIAS,
      input,
    );
  }

  public getUsuariosAlias(input: GetUsuariosAliasInput) {
    return this._client.send<UsuarioAliasOutput[]>(
      operacionesPatterns.GET_USUARIOS_ALIAS,
      input,
    );
  }

  public updateUsuarioAlias(input: UpdateUsuarioAliasInput) {
    return this._client.send<UsuarioAliasOutput>(
      operacionesPatterns.UPDATE_USUARIO_ALIAS,
      input,
    );
  }

  public deleteUsuarioAlias(input: DeleteUsuarioAliasInput) {
    return this._client.send<DeleteUsuarioAliasOutput>(
      operacionesPatterns.DELETE_USUARIO_ALIAS,
      input,
    );
  }

  public getUsuariosLogicosCandidatos( input: GetUsuariosLogicosCandidatosInput ) {
    return this._client.send<UsuarioLogicoCandidatoOutput[]>(
      operacionesPatterns.GET_USUARIOS_LOGICOS_CANDIDATOS,
      input,
    );
  }
}
