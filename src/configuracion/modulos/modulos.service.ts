import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { CreateModuloInput } from './dto/create-modulo.input';
import { UpdateModuloInput } from './dto/update-modulo.input';
import { CreateSubModuloInput } from './dto/create-submodulo.input';
import { UpdateSubModuloInput } from './dto/update-submodulo.input';
import { modulosPatterns } from 'src/common/constants/modulos/modulos.patterns';

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

  async createModulo(input: CreateModuloInput) {
    return this.client.send(
        modulosPatterns.CREATE,
        { input },
    )
    
  }

  async updateModulo(input: UpdateModuloInput) {
    return this.client.send(
        modulosPatterns.UPDATE,
        { input },
    )
    
  }

  async desactivateModulo(id: number) {
    return this.client.send(
        modulosPatterns.DESACTIVATE,
        { id },
    )
    
  }

  async activateModulo(id: number) {
    return this.client.send(
        modulosPatterns.ACTIVATE,
        { id },
    )
    
  }

  // ============================
  // SUBMÓDULOS
  // ============================

  async createSubModulo(input: CreateSubModuloInput) {
    return this.client.send(
        modulosPatterns.CREATE_SUBMODULO,
        { input },
    )
    
  }

  async getSubModuloById(id: number) {
    return this.client.send(
        modulosPatterns.GET_SUBMODULO_BY_ID,
        { id },
    )
    
  }

  async updateSubModulo(input: UpdateSubModuloInput) {
    return this.client.send(
        modulosPatterns.UPDATE_SUBMODULO,
        { input },
    )
    
  }

  async desactivateSubModulo(id: number) {
    return this.client.send(
        modulosPatterns.DESACTIVATE_SUBMODULO,
        { id },
    )    
  }

  async activateSubModulo(id: number) {
    return this.client.send(
        modulosPatterns.ACTIVATE_SUBMODULO,
        { id },
    )    
  }
}
