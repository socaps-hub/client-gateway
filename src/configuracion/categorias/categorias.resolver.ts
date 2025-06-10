import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { CategoriasService } from './categorias.service';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaInput } from './dto/inputs/create-categoria.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/supervision/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => Categoria)
@UseGuards( AuthGraphQLGuard )
export class CategoriasResolver {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Mutation(() => Categoria)
  createCategoria(
    @Args('createCategoriaInput') createCategoriaInput: CreateCategoriaInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.categoriasService.create(createCategoriaInput, user);
  }

  @Query(() => [Categoria], { name: 'categorias' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Query(() => Categoria, { name: 'categoria' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.categoriasService.findOne(id);
  }

  // @Mutation(() => Categoria)
  // updateCategoria(@Args('updateCategoriaInput') updateCategoriaInput: UpdateCategoriaInput) {
  //   return this.categoriasService.update(updateCategoriaInput.id, updateCategoriaInput);
  // }

  // @Mutation(() => Categoria)
  // removeCategoria(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoriasService.remove(id);
  // }
}