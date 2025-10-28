import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateCooperativaInput } from './dto/inputs/create-cooperativa.input';
import { UpdateCooperativaInput } from './dto/inputs/update-cooperativa.input';
import { cooperativasPatterns } from 'src/common/constants/cooperativas/cooperativasPatterns';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class CooperativasService {

  constructor(
      @Inject(NATS_SERVICE) private readonly _client: ClientProxy
  ) {}

  create(createCooperativaInput: CreateCooperativaInput) {
    return this._client.send( cooperativasPatterns.CREATE, createCooperativaInput )
  }

  findAll( role: ValidRoles ) {
    return this._client.send( cooperativasPatterns.GET_ALL, { role } )
  }
  
  findAllWithEjecutivos() {
    return this._client.send( cooperativasPatterns.GET_ALL_WITH_EJECUTIVOS, {} )
  }

  findOne(id: string) {
    return this._client.send( cooperativasPatterns.GET_BY_ID, { id } )
  }

  update(id: string, updateCooperativaInput: UpdateCooperativaInput) {
    return this._client.send( cooperativasPatterns.UPDATE, { id, updateCooperativaInput } )
  }

  activate(name: string) {
    return this._client.send( cooperativasPatterns.ACTIVATE, { name } )
  }

  desactivate(id: string) {
    return this._client.send( cooperativasPatterns.DESACTIVATE, { id } )
  }

  getCooperativasRadiografiaCreditoStatus() {
    return this._client.send( cooperativasPatterns.GET_RADIO_CREDITO_STATUS, {} )
  }
}
