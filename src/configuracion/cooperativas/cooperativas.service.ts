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

@Injectable()
export class CooperativasService {

  constructor(
    @Inject(NATS_SERVICE) private readonly _client: ClientProxy
  ) { }

  // ===============================
  // COOPERATIVAS
  // ===============================

  create(createCooperativaInput: CreateCooperativaInput) {
    return this._client.send(
      cooperativasPatterns.CREATE,
      createCooperativaInput
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

  update(id: string, updateCooperativaInput: UpdateCooperativaInput) {
    return this._client.send(
      cooperativasPatterns.UPDATE,
      { id, updateCooperativaInput }
    );
  }

  activate(name: string) {
    return this._client.send(
      cooperativasPatterns.ACTIVATE,
      { name }
    );
  }

  desactivate(id: string) {
    return this._client.send(
      cooperativasPatterns.DESACTIVATE,
      { id }
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

  assignModuloToCooperativa(input: AssignCooperativaModuloInput) {
    return this._client.send(
      cooperativasPatterns.ASSIGN_MODULO,
      input
    );
  }

  updateCooperativaModulo(input: UpdateCooperativaModuloInput) {
    return this._client.send(
      cooperativasPatterns.UPDATE_MODULO,
      input
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

  assignSubModuloToCooperativa(input: AssignCooperativaSubModuloInput) {
    return this._client.send(
      cooperativasPatterns.ASSIGN_SUBMODULO,
      input
    );
  }

  updateCooperativaSubModulo(input: UpdateCooperativaSubModuloInput) {
    return this._client.send(
      cooperativasPatterns.UPDATE_SUBMODULO,
      input
    );
  }
}
