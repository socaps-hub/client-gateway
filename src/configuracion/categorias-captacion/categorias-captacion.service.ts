import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Observable } from 'rxjs';

import { NATS_SERVICE } from 'src/config/services';
import { CategoriaCaptacion } from './entities/categoria-captacion.entity';
import { categoriasCaptacionPatterns } from '../../common/constants';

@Injectable()
export class CategoriasCaptacionService {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _client: ClientProxy,
  ) {}

  public findAll(): Observable<CategoriaCaptacion[]> {
    return this._client.send<CategoriaCaptacion[]>(
      categoriasCaptacionPatterns.GET_ALL, {},
    );
  }

  public findOne(id: string): Observable<CategoriaCaptacion> {
    return this._client.send<CategoriaCaptacion>(
      categoriasCaptacionPatterns.GET_BY_ID, { id },
    );
  }
}
