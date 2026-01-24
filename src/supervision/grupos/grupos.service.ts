import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateGrupoInput } from './dto/create-grupo.input';
import { gruposPatterns } from 'src/common/constants/grupos/gruposPatterns';
import { UpdateGrupoInput } from './dto/update-grupo.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateManyGruposFromExcelDto } from './dto/create-many-grupos-from-excel.dto';
import { GrupoTipo } from './enums/grupo-type-enum';

@Injectable()
export class GruposService {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  create(createGrupoInput: CreateGrupoInput, user: Usuario) {
    return this.client.send( gruposPatterns.CREATE, { createGrupoInput, user });
  }

  findAll(coopId: string, type: GrupoTipo) {
    return this.client.send( gruposPatterns.GET_ALL, { coopId, type });
  }

  findAllAdminGroups(coopId: string) {
    return this.client.send( gruposPatterns.GET_ALL_ADMIN_GROUPS, { coopId });
  }

  findByName(name: string, user: Usuario) {
    return this.client.send( gruposPatterns.GET_BY_NAME, { name, user });
  }
  
  update( updateGrupoInput: UpdateGrupoInput, user: Usuario ) {
    return this.client.send( gruposPatterns.UPDATE, { updateGrupoInput });    
  }

  remove( id: string, user: Usuario ) {
    return this.client.send( gruposPatterns.REMOVE, { id, user });    
  }

  createManyFromExcel( data: CreateManyGruposFromExcelDto[], coopId: string, user: Usuario ) {
    return this.client.send( gruposPatterns.CREATE_MANY_FROM_EXCEL, { data, coopId, user });    
  }

}
