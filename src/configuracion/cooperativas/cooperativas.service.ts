import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

import { CreateCooperativaInput } from './dto/inputs/create-cooperativa.input';
import { UpdateCooperativaInput } from './dto/inputs/update-cooperativa.input';

import { cooperativasPatterns } from 'src/common/constants/cooperativas/cooperativasPatterns';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

// LICENCIAMIENTO
import { AssignCooperativaModuloInput } from './dto/inputs/assign-cooperativa-modulo.input';
import { UpdateCooperativaModuloInput } from './dto/inputs/update-cooperativa-modulo.input';
import { AssignCooperativaSubModuloInput } from './dto/inputs/assign-cooperativa-submodulo.input';
import { UpdateCooperativaSubModuloInput } from './dto/inputs/update-cooperativa-submodulo.input';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class CooperativasService {

  constructor(
    @Inject(NATS_SERVICE) private readonly _client: ClientProxy
  ) { }

  // ===============================
  // COOPERATIVAS
  // ===============================

  create(createCooperativaInput: CreateCooperativaInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.CREATE,
      { createCooperativaInput, user }
    );
  }

  findAll(role: ValidRoles) {
    return this._client.send(
      cooperativasPatterns.GET_ALL,
      { role }
    );
  }

  findAllWithEjecutivos() {
    return this._client.send(
      cooperativasPatterns.GET_ALL_WITH_EJECUTIVOS,
      {}
    );
  }

  findOne(id: string) {
    return this._client.send(
      cooperativasPatterns.GET_BY_ID,
      { id }
    );
  }

  update(id: string, updateCooperativaInput: UpdateCooperativaInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.UPDATE,
      { id, updateCooperativaInput, user }
    );
  }

  activate(name: string, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.ACTIVATE,
      { name, user }
    );
  }

  desactivate(id: string, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.DESACTIVATE,
      { id, user }
    );
  }

  getCooperativasRadiografiaCreditoStatus() {
    return this._client.send(
      cooperativasPatterns.GET_RADIO_CREDITO_STATUS,
      {}
    );
  }

  // ===============================
  // LICENCIAMIENTO – MÓDULOS (C02)
  // ===============================

  assignModuloToCooperativa(input: AssignCooperativaModuloInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.ASSIGN_MODULO,
      { input, user }
    );
  }

  updateCooperativaModulo(input: UpdateCooperativaModuloInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.UPDATE_MODULO,
      { input, user }
    );
  }

  getModulosByCooperativa(coopId: string) {
    return this._client.send(
      cooperativasPatterns.GET_MODULOS_BY_COOPERATIVA,
      { coopId }
    );
  }

  // ===============================
  // LICENCIAMIENTO – SUBMÓDULOS (C03)
  // ===============================

  assignSubModuloToCooperativa(input: AssignCooperativaSubModuloInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.ASSIGN_SUBMODULO,
      { input, user }
    );
  }

  updateCooperativaSubModulo(input: UpdateCooperativaSubModuloInput, user: Usuario) {
    return this._client.send(
      cooperativasPatterns.UPDATE_SUBMODULO,
      { input, user }
    );
  }
}
