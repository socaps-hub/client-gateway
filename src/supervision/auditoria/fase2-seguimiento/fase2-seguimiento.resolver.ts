import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Fase2SeguimientoService } from './fase2-seguimiento.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateFase2SeguimientoInput } from './dto/inputs/credito/create-fase2-seguimiento.input';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';

@Resolver()
@UseGuards( AuthGraphQLGuard )
export class Fase2SeguimientoResolver {

  constructor(private readonly fase2SeguimientoService: Fase2SeguimientoService) {}

  @Mutation(() => BooleanResponse, {
    name: 'aCreditoCreateOrUpdateFase2',
  })
  async aCreditoCreateOrUpdateFase2(
    @Args('input') input: CreateFase2SeguimientoInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.fase2SeguimientoService.createOrUpdateFase2( input, user );
  }

}
