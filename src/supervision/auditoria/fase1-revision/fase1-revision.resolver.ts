import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Fase1RevisionService } from './fase1-revision.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateFase1RevisionInput } from './dto/inputs/credito/create-fase1-revision.input';

@Resolver()
@UseGuards( AuthGraphQLGuard )
export class Fase1RevisionResolver {

  constructor(private readonly fase1RevisionService: Fase1RevisionService) {}

  @Mutation(() => BooleanResponse, {
    name: 'aCreditoCreateOrUpdateFase1',
  })
  async aCreditoCreateOrUpdateFase1(
    @Args('input') input: CreateFase1RevisionInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.fase1RevisionService.createOrUpdateFase1( input, user );
  }

}
