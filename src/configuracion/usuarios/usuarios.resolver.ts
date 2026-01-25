import { Request } from 'express';
import { ParseUUIDPipe, Req, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, Context } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/inputs/create-usuario.input';
import { UpdateUsuarioInput } from './dto/inputs/update-usuario.input';
import { ChangePasswordInput } from './dto/inputs/change-password.input';
import { firstValueFrom } from 'rxjs';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateManyUsuariosFromExcelArgs } from './dto/args/create-many-usuario-from-excel.arg';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { RpcMetaContext } from 'src/common/interfaces/rpc-meta-context.interface';

@Resolver(() => Usuario)
@UseGuards( AuthGraphQLGuard )
export class UsuariosResolver {

  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuario)
  createUsuario(
    @Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.admin, ValidRoles.auditorAdmin, ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.usuariosService.create( createUsuarioInput, user );
  }

  @Query(() => [Usuario], { name: 'usuarios' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.usuariosService.findAll( validRoles.role, user );
  }

  @Query(() => Usuario, { name: 'usuario' })
  findByNI(
    @Args('ni', { type: () => String }) ni: string
  ) {
    return this.usuariosService.findByNI(ni, true);
  }

  @Mutation(() => Usuario)
  updateUsuario(
    @Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.usuariosService.update(updateUsuarioInput, user);
  }

  @Mutation(() => Usuario)
  desactivateUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.usuariosService.desactivate(id, user);
  }

  @Mutation(() => Usuario)
  activateUser(
    @Args('userNI', { type: () => String }) userNI: string,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser, ValidRoles.admin ]}) user: Usuario,
  ) {
    return this.usuariosService.activate(userNI.toUpperCase(), user);
  }

  @Mutation(() => Usuario)
  async changePassword(
    @Args('data') data: ChangePasswordInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
    @Context() ctx: { req: Request },
  ) {
    const req = ctx.req;

    const meta = {
      ip:
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]
        ?? req.socket?.remoteAddress,
      userAgent: req.headers['user-agent'],
      requestId: req.headers['x-request-id']?.toString(),
      correlationId: req.headers['x-correlation-id']?.toString(),
    };

    return this.usuariosService.changePassword(
      data,
      user,
      meta,
    );
  }

  @Mutation(() => BooleanResponse)
  createManyUsuariosFromExcel(
    @Args('createManyUsuariosFromExcelArgs') createManyUsuariosFromExcelArgs: CreateManyUsuariosFromExcelArgs,
    @GetUser({type: 'graphql', roles: [ ValidRoles.superUser ]}) user: Usuario,
  ) {
    return this.usuariosService.createManyFromExcel(createManyUsuariosFromExcelArgs.data, createManyUsuariosFromExcelArgs.coopId, user);
  }
}