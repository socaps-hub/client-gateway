import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';

import { RubrosService } from './rubros.service';
import { Rubro } from './entities/rubro.entity';
import { CreateRubroInput } from './dto/create-rubro.input';
import { UpdateRubroInput } from './dto/update-rubro.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateManyRubrosFromExcelArgs } from './dto/args/create-many-rubros-from-excel.arg';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Resolver(() => Rubro)
@UseGuards( AuthGraphQLGuard )
export class RubrosResolver {

  constructor(private readonly rubrosService: RubrosService) {}

  @Mutation(() => Rubro)
  createRubro(
    @Args('createRubroInput') createRubroInput: CreateRubroInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.rubrosService.create(createRubroInput);
  }

  @Query(() => [Rubro], { name: 'rubros' })
  findAll(
    @Args('coopId', { type: () => String }, ParseUUIDPipe) coopId: string
  ) {
    return this.rubrosService.findAll( coopId );
  }

  @Query(() => Rubro, { name: 'rubro' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.rubrosService.findById(id);
  }

  @Mutation(() => Rubro)
  updateRubro(
    @Args('updateRubroInput') updateRubroInput: UpdateRubroInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.rubrosService.update(updateRubroInput.id, updateRubroInput);
  }

  @Mutation(() => Rubro)
  removeRubro(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.rubrosService.remove(id);
  }

  @Mutation(() => BooleanResponse)
  createManyRubrosFromExcel(
    @Args('createManyRubrosFromExcelArgs') createManyRubrosFromExcelArgs: CreateManyRubrosFromExcelArgs,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.rubrosService.createManyFromExcel(createManyRubrosFromExcelArgs.data, createManyRubrosFromExcelArgs.coopId);
  }
}
