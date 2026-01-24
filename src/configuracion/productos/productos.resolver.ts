import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ProductosService } from './productos.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { CreateProductoInput } from './dto/inputs/create-producto.input';
import { UpdateProductoInput } from './dto/inputs/update-producto.input';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Producto } from './entities/producto.entity';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateProductoImportDto } from './dto/inputs/create-producto-import.dto';
import { firstValueFrom } from 'rxjs';
import { CreateManyFromExcelArgs } from './dto/args/create-many-from-excel.arg';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Resolver(() => Producto)
@UseGuards( AuthGraphQLGuard )
export class ProductosResolver {

  constructor(private readonly productosService: ProductosService) {}

  @Mutation(() => Producto)
  createProducto(
    @Args('createProductoInput') createProductoInput: CreateProductoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.productosService.create(createProductoInput, user);
  }

  @Query(() => [Producto], { name: 'productos' })
  findAll(
    @GetUser({type: 'graphql'}) user: Usuario,
    @Args('categoriaId', { type: () => String, nullable: true }) categoriaId?: string,
  ) {
    return this.productosService.getProductos(user, categoriaId);
  }

  @Mutation(() => Producto)
  updateProducto(
    @Args('updateProductoInput') updateProductoInput: UpdateProductoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.productosService.update(updateProductoInput.id, updateProductoInput, user);
  }

  @Mutation(() => Producto)
  activateProducto(
    @Args('name', { type: () => String }) name: string,
    @Args('coopId', { type: () => String }) coopId: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.productosService.activate(name, coopId, user);
  }

  @Mutation(() => Producto)
  desactivateProducto(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.productosService.desactivate(id, user);
  }

  @Mutation(() => BooleanResponse)
  async createManyFromExcel(
    @Args('createManyFromExcelArgs') createManyFromExcelArgs: CreateManyFromExcelArgs,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return await firstValueFrom(
      this.productosService.createManyFromExcel(createManyFromExcelArgs.data, createManyFromExcelArgs.coopId, user)
    );
  }

}
