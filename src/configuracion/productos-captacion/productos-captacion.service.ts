import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Observable } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateProductoCaptacionInput } from './dto/inputs/create-producto-captacion.input';
import { UpdateProductoCaptacionInput } from './dto/inputs/update-producto-captacion.input';
import { CreateProductoCaptacionImportDto } from './dto/inputs/create-producto-captacion-import.dto';
import { ProductoCaptacion } from './entities/producto-captacion.entity';
import { productosCaptacionPatterns } from '../../common/constants';
import { SyncProductosCaptacionInfantilesInput } from './dto/inputs/sync-productos-captacion-infantiles.input';

@Injectable()
export class ProductosCaptacionService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public create(
    input: CreateProductoCaptacionInput,
    user: Usuario,
  ): Observable<ProductoCaptacion> {
    return this._client.send<ProductoCaptacion>(
      productosCaptacionPatterns.CREATE,
      {
        createProductoCaptacionInput: input,
        user,
      },
    );
  }

  public findAll(
    coopId: string,
    user: Usuario,
    categoriaId?: string,
  ): Observable<ProductoCaptacion[]> {
    return this._client.send<ProductoCaptacion[]>(
      productosCaptacionPatterns.GET_ALL,
      {
        coopId,
        categoriaId,
        user,
      },
    );
  }

  public findByID(
    id: string,
    coopId: string,
    user: Usuario,
  ): Observable<ProductoCaptacion> {
    return this._client.send<ProductoCaptacion>(
      productosCaptacionPatterns.GET_BY_ID,
      {
        id,
        coopId,
        user,
      },
    );
  }

  public update(
    id: string,
    coopId: string,
    input: UpdateProductoCaptacionInput,
    user: Usuario,
  ): Observable<ProductoCaptacion> {
    return this._client.send<ProductoCaptacion>(
      productosCaptacionPatterns.UPDATE,
      {
        id,
        coopId,
        updateProductoCaptacionInput: input,
        user,
      },
    );
  }

  public activate(
    name: string,
    coopId: string,
    user: Usuario,
  ): Observable<ProductoCaptacion> {
    return this._client.send<ProductoCaptacion>(
      productosCaptacionPatterns.ACTIVATE,
      {
        name,
        coopId,
        user,
      },
    );
  }

  public desactivate(
    id: string,
    coopId: string,
    user: Usuario,
  ): Observable<ProductoCaptacion> {
    return this._client.send<ProductoCaptacion>(
      productosCaptacionPatterns.DESACTIVATE,
      {
        id,
        coopId,
        user,
      },
    );
  }

  public syncInfantiles(
    input: SyncProductosCaptacionInfantilesInput,
    user: Usuario,
  ): Observable<BooleanResponse> {

    return this._client.send<BooleanResponse>(
      productosCaptacionPatterns
        .SYNC_INFANTILES,
      {
        input,
        user,
      },
    );
  }

  public createManyFromExcel(
    data: CreateProductoCaptacionImportDto[],
    coopId: string,
    user: Usuario,
  ): Observable<BooleanResponse> {
    return this._client.send<BooleanResponse>(
      productosCaptacionPatterns.CREATE_MANY_FROM_EXCEL,
      {
        data,
        coopId,
        user,
      },
    );
  }
}
