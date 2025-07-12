import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CreateEvaluacionResumenFase2Input } from './dto/inputs/create-evaluacion-resumen-fase2.input';
import { UpdateEvaluacionResumenFase2Input } from './dto/inputs/update-evaluacion-resumen-fase2.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { resumenFase2Patterns } from 'src/common/constants/evaluaciones/resumen/resumen-fase2Patterns';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class ResumenFase2Service {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) {}

    create(input: CreateEvaluacionResumenFase2Input, user: Usuario) {
        return this.client.send(resumenFase2Patterns.CREATE, { input, user })    
    }

    findAll(user: Usuario) {
        return this.client.send(resumenFase2Patterns.FIND_ALL, user)    
    }

    findOne(R08P_num: string, user: Usuario) {
        return this.client.send(resumenFase2Patterns.FIND_ONE, { R08P_num, user })    
    }

    update(input: UpdateEvaluacionResumenFase2Input, user: Usuario) {
        return this.client.send(resumenFase2Patterns.UPDATE, { input, user })    
    }

    deleteByPrestamo(prestamoId: string, user: Usuario) {
        console.log(prestamoId);
        
        return this.client.send(resumenFase2Patterns.DELETE_BY_PRESTAMO, { prestamoId, user })    
    }
}
