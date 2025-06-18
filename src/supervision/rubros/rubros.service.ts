import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateRubroInput } from './dto/create-rubro.input';
import { UpdateRubroInput } from './dto/update-rubro.input';
import { rubrosPatterns } from 'src/common/constants/rubros/rubrosPatterns';

@Injectable()
export class RubrosService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createRubroInput: CreateRubroInput) {
    return this.client.send( rubrosPatterns.CREATE , createRubroInput );
  }

  findAll(coopId: string) {
    return this.client.send( rubrosPatterns.GET_ALL , { coopId } );
  }

  findById(id: string) {
    return this.client.send( rubrosPatterns. GET_BY_ID , { id } );
  }

  update(id: string, updateRubroInput: UpdateRubroInput) {
    return this.client.send( rubrosPatterns.UPDATE , { id, updateRubroInput } );
  }

  remove(id: string) {
    return this.client.send( rubrosPatterns.REMOVE , { id } );
  }
}
