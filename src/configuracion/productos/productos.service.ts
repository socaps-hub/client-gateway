import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateProductoInput } from './dto/inputs/create-producto.input';
import { productsPatterns } from '../../common/constants';
import { UpdateProductoInput } from './dto/inputs/update-producto.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateProductoImportDto } from './dto/inputs/create-producto-import.dto';

@Injectable()
export class ProductosService {

    constructor(
        @Inject(NATS_SERVICE) private readonly _client: ClientProxy
    ) {}

    getProductos( user: Usuario, categoriaId?: string ) {
        return this._client.send( productsPatterns.GET_ALL , { usuario: user, categoriaId } )
    }

    create( createProductoInput: CreateProductoInput, user: Usuario ) {
        return this._client.send(productsPatterns.CREATE, { createProductoInput, user })
    }

    update( id: string, updateProductoInput: UpdateProductoInput, user: Usuario ) {
        return this._client.send(productsPatterns.UPDATE_PRODUCT, { id, updateProductoInput, user })
    }

    activate( name: string, coopId: string, user: Usuario ) {
        return this._client.send(productsPatterns.ACTIVATE_PRODUCT, { name, coopId, user })
    }

    desactivate( id: string, user: Usuario ) {
        return this._client.send(productsPatterns.DESACTIVATE_PRODUCT, { id, user })    }
    
    createManyFromExcel( data: CreateProductoImportDto[], coopId: string, user: Usuario ) {
        return this._client.send(productsPatterns.CREATE_MANY_FROM_EXCEL, { data, coopId, user })
    }
    
}
