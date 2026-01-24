import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateRubroInput } from './dto/create-rubro.input';
import { UpdateRubroInput } from './dto/update-rubro.input';
import { rubrosPatterns } from 'src/common/constants/rubros/rubrosPatterns';
import { CreateManyRubrosFromExcelDto } from './dto/create-many-rubros-from-excel.dto';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Injectable()
export class RubrosService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createRubroInput: CreateRubroInput, user: Usuario) {
    return this.client.send( rubrosPatterns.CREATE , { createRubroInput, user } );
  }

  findAll(coopId: string) {
    return this.client.send( rubrosPatterns.GET_ALL , { coopId } );
  }

  findById(id: string) {
    return this.client.send( rubrosPatterns. GET_BY_ID , { id } );
  }

  update(id: string, updateRubroInput: UpdateRubroInput, user: Usuario) {
    return this.client.send( rubrosPatterns.UPDATE , { id, updateRubroInput } );
  }

  remove(id: string, user: Usuario) {
    return this.client.send( rubrosPatterns.REMOVE , { id, user } );
  }

  createManyFromExcel(data: CreateManyRubrosFromExcelDto[], coopId: string, user: Usuario) {
    return this.client.send( rubrosPatterns.CREATE_MANY_FROM_EXCEL , { data, coopId, user } );
  }
}
