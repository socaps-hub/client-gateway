import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { CreateModuloInput } from './dto/create-modulo.input';
import { UpdateModuloInput } from './dto/update-modulo.input';
import { CreateSubModuloInput } from './dto/create-submodulo.input';
import { UpdateSubModuloInput } from './dto/update-submodulo.input';
import { modulosPatterns } from 'src/common/constants/modulos/modulos.patterns';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ModulosService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  // ============================
  // MÓDULOS
  // ============================

  async getAllModulos() {
    return this.client.send(
        modulosPatterns.GET_ALL,
        {},
    )
    
  }

  async getModuloById(id: number) {
    return this.client.send(
        modulosPatterns.GET_BY_ID,
        { id },
    )
    
  }

  async createModulo(input: CreateModuloInput, user: Usuario) {
    return this.client.send(
        modulosPatterns.CREATE,
        { input, user },
    )
    
  }

  async updateModulo(input: UpdateModuloInput, user: Usuario) {
    return this.client.send(
        modulosPatterns.UPDATE,
        { input, user },
    )
    
  }

  async desactivateModulo(id: number, user: Usuario) {
    return this.client.send(
        modulosPatterns.DESACTIVATE,
        { id, user },
    )
    
  }

  async activateModulo(id: number, user: Usuario) {
    return this.client.send(
        modulosPatterns.ACTIVATE,
        { id, user },
    )
    
  }

  // ============================
  // SUBMÓDULOS
  // ============================

  async createSubModulo(input: CreateSubModuloInput, user: Usuario) {
    return this.client.send(
        modulosPatterns.CREATE_SUBMODULO,
        { input, user },
    )
    
  }

  async getSubModuloById(id: number) {
    return this.client.send(
        modulosPatterns.GET_SUBMODULO_BY_ID,
        { id },
    )
    
  }

  async updateSubModulo(input: UpdateSubModuloInput, user: Usuario) {
    return this.client.send(
        modulosPatterns.UPDATE_SUBMODULO,
        { input, user },
    )
    
  }

  async desactivateSubModulo(id: number, user: Usuario) {
    return this.client.send(
        modulosPatterns.DESACTIVATE_SUBMODULO,
        { id, user },
    )    
  }

  async activateSubModulo(id: number, user: Usuario) {
    return this.client.send(
        modulosPatterns.ACTIVATE_SUBMODULO,
        { id, user },
    )    
  }
}
