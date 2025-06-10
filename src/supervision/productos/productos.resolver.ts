import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ProductosService } from './productos.service';
import { Usuario } from 'src/supervision/usuarios/entities/usuario.entity';
import { Producto } from './entities/producto.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { CreateProductoInput } from './dto/inputs/create-producto.input';
import { UpdateProductoInput } from './dto/inputs/update-producto.input';

@Resolver(() => Producto)
@UseGuards( AuthGraphQLGuard )
export class ProductosResolver {

  constructor(private readonly productosService: ProductosService) {}

  @Mutation(() => Producto)
  createProducto(
    @Args('createProductoInput') createProductoInput: CreateProductoInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.productosService.create(createProductoInput, user);
  }

  @Query(() => [Producto], { name: 'productos' })
  findAll(
    @GetUser('graphql') user: Usuario
  ) {
    return this.productosService.getProductos(user);
  }

  @Mutation(() => Producto)
  updateProducto(
    @Args('updateProductoInput') updateProductoInput: UpdateProductoInput,
    @GetUser() user: Usuario
  ) {
    return this.productosService.update(updateProductoInput.id, updateProductoInput, user);
  }

  @Mutation(() => Producto)
  activateProducto(
    @Args('name', { type: () => String }) name: string,
    @GetUser() user: Usuario
  ) {
    return this.productosService.activate(name, user);
  }

  @Mutation(() => Producto)
  desactivateProducto(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.productosService.desactivate(id);
  }

}
