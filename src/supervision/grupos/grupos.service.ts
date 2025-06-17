import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateGrupoInput } from './dto/create-grupo.input';
import { gruposPatterns } from 'src/common/constants/grupos/gruposPatterns';
import { UpdateGrupoInput } from './dto/update-grupo.input';

@Injectable()
export class GruposService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createGrupoInput: CreateGrupoInput) {
    return this.client.send( gruposPatterns.CREATE, { createGrupoInput });
  }

  findAll(coopId: string) {
    return this.client.send( gruposPatterns.GET_ALL, { coopId });
  }
  
  update( updateGrupoInput: UpdateGrupoInput ) {
    return this.client.send( gruposPatterns.UPDATE, { updateGrupoInput });    
  }

  remove( id: string ) {
    return this.client.send( gruposPatterns.REMOVE, { id });    
  }

}
