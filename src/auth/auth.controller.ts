import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/user.decorator';
import { Token } from './decorators/token.decorator';
import { catchError } from 'rxjs';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  
  constructor(
    @Inject(NATS_SERVICE) private readonly _client: ClientProxy
  ) {}

  @Post('login')
  login(
    @Body() loginDto: LoginUserDto
  ) {
    return this._client.send('auth.login_user', loginDto).pipe(
      catchError( err => {
        throw new RpcException(err)
      })
    )
  }

  @UseGuards( AuthGuard )
  @Get('check-status')
  verifyUser( 
    @GetUser('rest') user: Usuario,
    @Token() token: string 
  ) {

    // const user = req['user']
    // const token = req['token']
    
    // return this._authClient.send('auth.check_auth_status', token)
    return { user, token }
  }

}
