import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ValidRoles } from '../enums/valid-roles.enum';

interface GetUserData {
  type: 'rest' | 'graphql',
  roles?: ValidRoles[]
}

export const GetUser = createParamDecorator(
  (data: GetUserData, context: ExecutionContext) => {    
    const { type, roles = [] } = data
    
    let request
    if ( type === 'rest' ) {
      request = context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context)
      const user: Usuario = ctx.getContext().req.user

      if ( !user ) {
        throw new InternalServerErrorException('No user inside the request - make sure that we used the AuthGuard')
      }

      if ( roles.length === 0 ) return user

      if ( roles.includes( user.R12Rol as ValidRoles ) ) {
        return user
      }

      throw new ForbiddenException()
    }


    // * GRAPHQL 
    if ( !request.user ) {
        throw new InternalServerErrorException('User not found in request (AuthGuard called?)')
    }

    if ( roles.length === 0 ) return request.user

    if ( roles.includes( request.user.R12Rol as ValidRoles ) ) {
        return request.user
      }

    throw new ForbiddenException()
  },
);


