import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Usuario } from 'src/supervision/usuarios/entities/usuario.entity';
import { NATS_SERVICE } from 'src/config';
import { CreateProductoInput } from './dto/inputs/create-producto.input';
import { productsPatterns } from '../../common/constants';
import { UpdateProductoInput } from './dto/inputs/update-producto.input';
import { catchError } from 'rxjs';

@Injectable()
export class ProductosService {

    constructor(
        @Inject(NATS_SERVICE) private readonly _client: ClientProxy
    ) {}

    getProductos( user: Usuario ) {
        return this._client.send( productsPatterns.GET_ALL , {usuario: user})
    }

    create( createProductoInput: CreateProductoInput, user: Usuario ) {
        return this._client.send(productsPatterns.CREATE, { createProductoInput, user })
    }

    update( id: string, updateProductoInput: UpdateProductoInput, user: Usuario ) {
        return this._client.send(productsPatterns.UPDATE_PRODUCT, { id, updateProductoInput, user })
    }

    activate( name: string, user: Usuario ) {
        return this._client.send(productsPatterns.ACTIVATE_PRODUCT, { name, user })
    }

    desactivate( id: string ) {
        return this._client.send(productsPatterns.DESACTIVATE_PRODUCT, { id })
    }
    
}
