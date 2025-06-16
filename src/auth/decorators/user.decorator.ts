import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

export const GetUser = createParamDecorator(
  (type: 'rest'|'graphql', context: ExecutionContext) => {

    let request
    if ( type === 'rest' ) {
      request = context.switchToHttp().getRequest();
    } else {
      const ctx = GqlExecutionContext.create(context)
      const user: Usuario = ctx.getContext().req.user

      if ( !user ) {
        throw new InternalServerErrorException('No user inside the request - make sure that we used the AuthGuard')
      }

      return user
    }

    if ( !request.user ) {
        throw new InternalServerErrorException('User not found in request (AuthGuard called?)')
    }

    return request.user;
  },
);


