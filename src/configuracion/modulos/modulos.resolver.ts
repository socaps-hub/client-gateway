import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ModulosService } from './modulos.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { M02ModuloEntity } from './entities/modulo.entity';
import { CreateModuloInput } from './dto/create-modulo.input';
import { UpdateModuloInput } from './dto/update-modulo.input';
import { M03SubModuloEntity } from './entities/submodulo.entity';
import { CreateSubModuloInput } from './dto/create-submodulo.input';
import { UpdateSubModuloInput } from './dto/update-submodulo.input';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class ModulosResolver {

  constructor(private readonly _modulosService: ModulosService) {}

  @Query(() => [M02ModuloEntity], { name: 'MgetAllModulos' })
  modulos(
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.getAllModulos();
  }

  @Query(() => M02ModuloEntity, { name: 'MgetModuloById' })
  modulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.getModuloById(id);
  }

  @Mutation(() => M02ModuloEntity, { name: 'McreateModulo' })
  createModulo(
    @Args('input') input: CreateModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.createModulo(input);
  }

  @Mutation(() => M02ModuloEntity, { name: 'MupdateModulo' })
  updateModulo(
    @Args('input') input: UpdateModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.updateModulo(input);
  }

  @Mutation(() => M02ModuloEntity, { name: 'MdesactivateModulo' })
  desactivateModulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.desactivateModulo(id);
  }

  @Mutation(() => M02ModuloEntity, { name: 'MactivateModulo' })
  activateModulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.activateModulo(id);
  }

  // ============================
  //* SUBMÓDULOS
  // ============================
  @Query(() => M03SubModuloEntity, { name: 'MgetSubModuloById' })
  submodulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.getSubModuloById(id);
  }

  @Mutation(() => M03SubModuloEntity, { name: 'McreateSubModulo' })
  createSubModulo(
    @Args('input') input: CreateSubModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.createSubModulo(input);
  }

  @Mutation(() => M03SubModuloEntity, { name: 'MupdateSubModulo' })
  updateSubModulo(
    @Args('input') input: UpdateSubModuloInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.updateSubModulo(input);
  }

  @Mutation(() => M03SubModuloEntity, { name: 'MdesactivateSubModulo' })
  desactivateSubModulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.desactivateSubModulo(id);
  }

  @Mutation(() => M03SubModuloEntity, { name: 'MactivateSubModulo' })
  activateSubModulo(
    @Args('id', { type: () => Int }) id: number,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this._modulosService.activateSubModulo(id);
  }

}
