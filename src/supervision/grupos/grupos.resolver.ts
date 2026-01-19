import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { GruposService } from './grupos.service';
import { Grupo } from './entities/grupo.entity';
import { CreateGrupoInput } from './dto/create-grupo.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { UpdateGrupoInput } from './dto/update-grupo.input';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateManyGruposFromExcelArgs } from './dto/args/create-many-grupos-from-excel.arg';
import { GrupoTipo } from './enums/grupo-type-enum';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Resolver(() => Grupo)
@UseGuards( AuthGraphQLGuard )
export class GruposResolver {
  constructor(private readonly gruposService: GruposService) {}

  @Mutation(() => Grupo, { name: 'createGrupo' })
  createGrupo(
    @Args('createGrupoInput') createGrupoInput: CreateGrupoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.gruposService.create(createGrupoInput)
  }

  @Query(() => [Grupo], { name: 'grupos' })
  findAll(
    @Args('coopId', { type: () => ID }, ParseUUIDPipe) coopId: string,
    @Args('type', { type: () => GrupoTipo, nullable: true, defaultValue: GrupoTipo.SISCONCRE }) type: GrupoTipo
  ) {
    return this.gruposService.findAll( coopId , type);
  }

  @Query(() => [Grupo], { name: 'adminGroups' })
  findAllAdminGroups(
    @Args('coopId', { type: () => ID }, ParseUUIDPipe) coopId: string
  ) {
    return this.gruposService.findAllAdminGroups( coopId );
  }

  @Query(() => Grupo, { name: 'grupoByName' })
  findByName(
    @Args('name', { type: () => String }) name: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.gruposService.findByName(name, user);
  }

  @Mutation(() => Grupo)
  updateGrupo(
    @Args('updateGrupoInput') updateGrupoInput: UpdateGrupoInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.gruposService.update( updateGrupoInput );
  }

  @Mutation(() => Grupo)
  removeGrupo(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.gruposService.remove(id);
  }

  @Mutation(() => BooleanResponse)
  createManyGruposFromExcel(
    @Args('createManyGruposFromExcelArgs') createManyGruposFromExcelArgs: CreateManyGruposFromExcelArgs,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.gruposService.createManyFromExcel(createManyGruposFromExcelArgs.data, createManyGruposFromExcelArgs.coopId);
  }
}
