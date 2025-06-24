import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { CreateProductoInput } from './dto/inputs/create-producto.input';
import { productsPatterns } from '../../common/constants';
import { UpdateProductoInput } from './dto/inputs/update-producto.input';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class ProductosService {

    constructor(
        @Inject(NATS_SERVICE) private readonly _client: ClientProxy
    ) {}

    getProductos( user: Usuario, categoriaId?: string ) {
        return this._client.send( productsPatterns.GET_ALL , { usuario: user, categoriaId } )
    }

    create( createProductoInput: CreateProductoInput ) {
        return this._client.send(productsPatterns.CREATE, { createProductoInput })
    }

    update( id: string, updateProductoInput: UpdateProductoInput ) {
        return this._client.send(productsPatterns.UPDATE_PRODUCT, { id, updateProductoInput })
    }

    activate( name: string, coopId: string ) {
        return this._client.send(productsPatterns.ACTIVATE_PRODUCT, { name, coopId })
    }

    desactivate( id: string ) {
        return this._client.send(productsPatterns.DESACTIVATE_PRODUCT, { id })
    }
    
}
