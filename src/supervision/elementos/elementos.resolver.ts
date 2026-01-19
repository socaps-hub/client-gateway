import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { ElementosService } from './elementos.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { CreateElementoInput } from './dto/create-elemento.input';
import { UpdateElementoInput } from './dto/update-elemento.input';
import { Elemento } from './entities/elemento.entity';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateManyElementosFromExcelArgs } from './dto/args/create-many-elementos-from-excel.arg';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Resolver(() => Elemento)
@UseGuards(AuthGraphQLGuard)
export class ElementosResolver {

  constructor(
    private readonly elementosService: ElementosService
  ) {}

  @Mutation(() => Elemento)
  createElemento(
    @Args('createElementoInput') createElementoInput: CreateElementoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.elementosService.create(createElementoInput);
  }

  @Query(() => [Elemento], { name: 'elementosPorRubro' })
  findAll(
    @Args('rubroId', { type: () => ID }, ParseUUIDPipe) rubroId: string
  ) {
    return this.elementosService.findAll(rubroId);
  }

  @Query(() => Elemento, { name: 'elemento' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.elementosService.findById(id);
  }

  @Mutation(() => Elemento)
  updateElemento(
    @Args('updateElementoInput') updateElementoInput: UpdateElementoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.elementosService.update(updateElementoInput);
  }

  @Mutation(() => Elemento)
  removeElemento(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.elementosService.remove(id);
  }

  @Mutation(() => BooleanResponse)
  createManyElementosFromExcel(
    @Args('createManyElementosFromExcelArgs') createManyElementosFromExcelArgs: CreateManyElementosFromExcelArgs,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.elementosService.createManyFromExcel(createManyElementosFromExcelArgs.data, createManyElementosFromExcelArgs.rubroId);
  }
}
