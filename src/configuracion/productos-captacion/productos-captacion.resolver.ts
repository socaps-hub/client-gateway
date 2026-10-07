import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { firstValueFrom } from 'rxjs';

import { GetUser } from 'src/auth/decorators/user.decorator';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ProductoCaptacion } from './entities/producto-captacion.entity';
import { CreateProductoCaptacionInput } from './dto/inputs/create-producto-captacion.input';
import { UpdateProductoCaptacionInput } from './dto/inputs/update-producto-captacion.input';
import { CreateManyProductosCaptacionFromExcelArgs } from './dto/args/create-many-productos-captacion-from-excel.arg';
import { ProductosCaptacionService } from './productos-captacion.service';
import { SyncProductosCaptacionInfantilesInput } from './dto/inputs/sync-productos-captacion-infantiles.input';

@Resolver(() => ProductoCaptacion)
@UseGuards(AuthGraphQLGuard)
export class ProductosCaptacionResolver {
  constructor(
    private readonly productosCaptacionService: ProductosCaptacionService,
  ) {}

  @Mutation(() => ProductoCaptacion)
  createProductoCaptacion(
    @Args('createProductoCaptacionInput')
    createProductoCaptacionInput: CreateProductoCaptacionInput,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.create(
      createProductoCaptacionInput,
      user,
    );
  }

  @Query(() => [ProductoCaptacion], {
    name: 'productosCaptacion',
  })
  findAll(
    @Args(
      'coopId',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    coopId: string,

    @GetUser({
      type: 'graphql',
    })
    user: Usuario,

    @Args('categoriaId', {
      type: () => ID,
      nullable: true,
    })
    categoriaId?: string,
  ) {
    return this.productosCaptacionService.findAll(coopId, user, categoriaId);
  }

  @Query(() => ProductoCaptacion, {
    name: 'productoCaptacion',
  })
  findOne(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    id: string,

    @Args(
      'coopId',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    coopId: string,

    @GetUser({
      type: 'graphql',
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.findByID(id, coopId, user);
  }

  @Mutation(() => ProductoCaptacion)
  updateProductoCaptacion(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    id: string,

    @Args(
      'coopId',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    coopId: string,

    @Args('updateProductoCaptacionInput')
    updateProductoCaptacionInput: UpdateProductoCaptacionInput,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.update(
      id,
      coopId,
      updateProductoCaptacionInput,
      user,
    );
  }

  @Mutation(() => ProductoCaptacion)
  activateProductoCaptacion(
    @Args('name', {
      type: () => String,
    })
    name: string,

    @Args(
      'coopId',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    coopId: string,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.activate(name, coopId, user);
  }

  @Mutation(() => ProductoCaptacion)
  desactivateProductoCaptacion(
    @Args(
      'id',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    id: string,

    @Args(
      'coopId',
      {
        type: () => ID,
      },
      ParseUUIDPipe,
    )
    coopId: string,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.desactivate(id, coopId, user);
  }

  @Mutation(() => BooleanResponse)
  public syncProductosCaptacionInfantiles(
    @Args('input')
    input: SyncProductosCaptacionInfantilesInput,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return this.productosCaptacionService.syncInfantiles(input, user);
  }

  @Mutation(() => BooleanResponse)
  async createManyProductosCaptacionFromExcel(
    @Args('createManyProductosCaptacionFromExcelArgs')
    createManyProductosCaptacionFromExcelArgs: CreateManyProductosCaptacionFromExcelArgs,

    @GetUser({
      type: 'graphql',
      roles: [ValidRoles.superUser],
    })
    user: Usuario,
  ) {
    return await firstValueFrom(
      this.productosCaptacionService.createManyFromExcel(
        createManyProductosCaptacionFromExcelArgs.data,
        createManyProductosCaptacionFromExcelArgs.coopId,
        user,
      ),
    );
  }
}
