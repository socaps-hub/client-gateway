import { Args, ID, Query, Resolver } from '@nestjs/graphql';

import { CategoriaCaptacion } from './entities/categoria-captacion.entity';

import { CategoriasCaptacionService } from './categorias-captacion.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from '../../auth/guards/auth-graphql.guard';

@Resolver(() => CategoriaCaptacion)
@UseGuards(AuthGraphQLGuard)
export class CategoriasCaptacionResolver {
  constructor(private readonly _service: CategoriasCaptacionService) {}

  @Query(() => [CategoriaCaptacion], {
    name: 'categoriasCaptacion',
  })
  public findAll() {
    return this._service.findAll();
  }

  @Query(() => CategoriaCaptacion, {
    name: 'categoriaCaptacion',
  })
  public findOne(
    @Args('id', {
      type: () => ID,
    })
    id: string,
  ) {
    return this._service.findOne(id);
  }
}
