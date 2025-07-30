import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateElementoInput } from './dto/create-elemento.input';
import { UpdateElementoInput } from './dto/update-elemento.input';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { elementosPatterns } from 'src/common/constants/elementos/elementosPatterns';
import { CreateManyElementoFromExcelDto } from './dto/create-many-elementos-from-excel.dto';

@Injectable()
export class ElementosService {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ) { }

    async create( createElementoInput: CreateElementoInput ) {        
        return this.client.send(elementosPatterns.CREATE, { createElementoInput })
    }

    async findAll(rubroId: string) {        
        return this.client.send(elementosPatterns.GET_ALL, { rubroId })
    }

    async findById(id: string) {        
        return this.client.send(elementosPatterns.GET_BY_ID, { id })
    }

    async update(updateElementoInput: UpdateElementoInput) {        
        return this.client.send(elementosPatterns.UPDATE, { updateElementoInput })
    }

    async remove(id: string) {        
        return this.client.send(elementosPatterns.REMOVE, { id })
    }

    createManyFromExcel( data: CreateManyElementoFromExcelDto[],  rubroId: string ) {        
        return this.client.send(elementosPatterns.CREATE_MANY_FROM_EXCEL, { data, rubroId })
    }
}
