import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsuariosAliasService } from './usuarios-alias.service';
import { AuthGraphQLGuard } from '../../../auth/guards/auth-graphql.guard';
import { UsuarioAliasOutput } from './dto/outputs/usuario-alias.output';
import { GetUsuariosAliasInput } from './dto/inputs/get-usuarios-alias.input';
import { CreateUsuarioAliasInput } from './dto/inputs/create-usuario-alias.input';
import { UpdateUsuarioAliasInput } from './dto/inputs/update-usuario-alias.input';
import { DeleteUsuarioAliasOutput } from './dto/outputs/delete-usuario-alias.output';
import { DeleteUsuarioAliasInput } from './dto/inputs/delete-usuario-alias.input';
import { UsuarioLogicoCandidatoOutput } from './dto/outputs/usuario-logico-candidato.output';
import { GetUsuariosLogicosCandidatosInput } from './dto/inputs/get-usuarios-logicos-candidatos.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class UsuariosAliasResolver {
  constructor(private readonly _service: UsuariosAliasService) {}

  @Query(() => [UsuarioAliasOutput], {
    name: 'usuariosAlias',
  })
  public getAliases(@Args('input') input: GetUsuariosAliasInput) {
    return this._service.getUsuariosAlias(input);
  }

  @Mutation(() => UsuarioAliasOutput, {
    name: 'createUsuarioAlias',
  })
  public createAlias(@Args('input') input: CreateUsuarioAliasInput) {
    return this._service.createUsuarioAlias(input);
  }

  @Mutation(() => UsuarioAliasOutput, {
    name: 'updateUsuarioAlias',
  })
  public updateAlias(@Args('input') input: UpdateUsuarioAliasInput) {
    return this._service.updateUsuarioAlias(input);
  }

  @Mutation(() => DeleteUsuarioAliasOutput, {
    name: 'deleteUsuarioAlias',
  })
  public deleteAlias(@Args('input') input: DeleteUsuarioAliasInput) {
    return this._service.deleteUsuarioAlias(input);
  }

  @Query(() => [UsuarioLogicoCandidatoOutput], {
    name: 'usuariosLogicosCandidatos',
  })
  public getUsuariosLogicosCandidatos(
    @Args('input') input: GetUsuariosLogicosCandidatosInput,
  ) {
    return this._service.getUsuariosLogicosCandidatos(input);
  }
}
