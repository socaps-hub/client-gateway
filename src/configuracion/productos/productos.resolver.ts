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

@Resolver(() => Producto)
@UseGuards( AuthGraphQLGuard )
export class ProductosResolver {

  constructor(private readonly productosService: ProductosService) {}

  @Mutation(() => Producto)
  createProducto(
    @Args('createProductoInput') createProductoInput: CreateProductoInput,
  ) {
    return this.productosService.create(createProductoInput);
  }

  @Query(() => [Producto], { name: 'productos' })
  findAll(
    @GetUser('graphql') user: Usuario,
    @Args('categoriaId', { type: () => String, nullable: true }) categoriaId?: string,
  ) {
    return this.productosService.getProductos(user, categoriaId);
  }

  @Mutation(() => Producto)
  updateProducto(
    @Args('updateProductoInput') updateProductoInput: UpdateProductoInput,
  ) {
    return this.productosService.update(updateProductoInput.id, updateProductoInput);
  }

  @Mutation(() => Producto)
  activateProducto(
    @Args('name', { type: () => String }) name: string,
    @Args('coopId', { type: () => String }) coopId: string,
  ) {
    return this.productosService.activate(name, coopId);
  }

  @Mutation(() => Producto)
  desactivateProducto(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.productosService.desactivate(id);
  }

  @Mutation(() => BooleanResponse)
  async createManyFromExcel(
    @Args('createManyFromExcelArgs') createManyFromExcelArgs: CreateManyFromExcelArgs,
  ) {
    return await firstValueFrom(
      this.productosService.createManyFromExcel(createManyFromExcelArgs.data, createManyFromExcelArgs.coopId)
    );
  }

}
