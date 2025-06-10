import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';

import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
  
@Injectable()
export class AuthGraphQLGuard implements CanActivate {

    constructor(
        @Inject(NATS_SERVICE) private readonly _client: ClientProxy
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = GqlExecutionContext.create( context )
        const request = ctx.getContext().req
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException('Token not found')
        }

        try {
            const { user, token: newToken } = await firstValueFrom(
                this._client.send('auth.check_auth_status', token)
            )

            request['user'] = user
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

}
  