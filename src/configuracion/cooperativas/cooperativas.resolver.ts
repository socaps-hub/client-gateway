import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { CooperativasService } from './cooperativas.service';
import { Cooperativa } from './entities/cooperativa.entity';
import { CooperativaModulo } from './entities/cooperativa-modulo.entity';
import { CooperativaSubModulo } from './entities/cooperativa-submodulo.entity';

import { CreateCooperativaInput } from './dto/inputs/create-cooperativa.input';
import { UpdateCooperativaInput } from './dto/inputs/update-cooperativa.input';
import { AssignCooperativaModuloInput } from './dto/inputs/assign-cooperativa-modulo.input';
import { UpdateCooperativaModuloInput } from './dto/inputs/update-cooperativa-modulo.input';
import { AssignCooperativaSubModuloInput } from './dto/inputs/assign-cooperativa-submodulo.input';
import { UpdateCooperativaSubModuloInput } from './dto/inputs/update-cooperativa-submodulo.input';

import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { ValidRolesArgs } from '../usuarios/dto/args/roles.arg';
import { CooperativaRadiografiaStatus } from './dto/outputs/cooperativa-radiografia-status.output';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Resolver(() => Cooperativa)
@UseGuards(AuthGraphQLGuard)
export class CooperativasResolver {

  constructor(
    private readonly cooperativasService: CooperativasService
  ) {}

  // ===============================
  // COOPERATIVAS
  // ===============================

  @Mutation(() => Cooperativa)
  createCooperativa(
    @Args('createCooperativaInput') createCooperativaInput: CreateCooperativaInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.create(createCooperativaInput);
  }

  @Query(() => [Cooperativa], { name: 'cooperativas' })
  findAll(
    @Args() validRoles: ValidRolesArgs,    
  ) {
    return this.cooperativasService.findAll(validRoles.role);
  }

  @Query(() => [Cooperativa], { name: 'cooperativasWithEjecutivosOnly' })
  findAllWithEjecutivos() {
    return this.cooperativasService.findAllWithEjecutivos();
  }

  @Query(() => Cooperativa, { name: 'cooperativa' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) {
    return this.cooperativasService.findOne(id);
  }

  @Mutation(() => Cooperativa)
  updateCooperativa(
    @Args('updateCooperativaInput') updateCooperativaInput: UpdateCooperativaInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.update(
      updateCooperativaInput.id,
      updateCooperativaInput
    );
  }

  @Mutation(() => Cooperativa)
  activateCooperativa(
    @Args('name', { type: () => String }) name: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.activate(name);
  }

  @Mutation(() => Cooperativa)
  desactivateCooperativa(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.desactivate(id);
  }

  @Query(() => [CooperativaRadiografiaStatus], {
    name: 'cooperativasRadiografiaCreditoStatus'
  })
  getCooperativasRadiografiaCreditoStatus() {
    return this.cooperativasService.getCooperativasRadiografiaCreditoStatus();
  }

  // ===============================
  // LICENCIAMIENTO – MÓDULOS (C02)
  // ===============================

  @Mutation(() => CooperativaModulo, { name: 'LassignModuloToCooperativa' })
  assignModuloToCooperativa(
    @Args('input') input: AssignCooperativaModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.assignModuloToCooperativa(input);
  }

  @Mutation(() => CooperativaModulo, { name: 'LupdateCooperativaModulo' })
  updateCooperativaModulo(
    @Args('input') input: UpdateCooperativaModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.updateCooperativaModulo(input);
  }

  @Query(() => [CooperativaModulo], { name: 'LgetModulosByCooperativa' })
  getModulosByCooperativa(
    @Args('coopId', { type: () => ID }, ParseUUIDPipe) coopId: string,
  ) {
    return this.cooperativasService.getModulosByCooperativa(coopId);
  }

  // ===============================
  // LICENCIAMIENTO – SUBMÓDULOS (C03)
  // ===============================

  @Mutation(() => CooperativaSubModulo, { name: 'LassignSubModuloToCooperativa' })
  assignSubModuloToCooperativa(
    @Args('input') input: AssignCooperativaSubModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.assignSubModuloToCooperativa(input);
  }

  @Mutation(() => CooperativaSubModulo, { name: 'LupdateCooperativaSubModulo' })
  updateCooperativaSubModulo(
    @Args('input') input: UpdateCooperativaSubModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.cooperativasService.updateCooperativaSubModulo(input);
  }
}
