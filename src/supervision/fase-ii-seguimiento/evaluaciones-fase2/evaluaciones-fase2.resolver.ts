import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EvaluacionFase2 } from './entities/evaluacion-fase2.entity';
import { EvaluacionesFase2Service } from './evaluaciones-fase2.service';
import { CreateEvaluacionFase2Input } from './dto/inputs/create-evaluacion-fase2.input';
import { UpdateEvaluacionFase2Input } from './dto/inputs/update-evaluacion-fase2.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';

@Resolver(() => EvaluacionFase2)
@UseGuards(AuthGraphQLGuard)
export class EvaluacionesFase2Resolver {

  constructor(private readonly service: EvaluacionesFase2Service) {}

  @Mutation(() => BooleanResponse)
  async createEvaluacionesFase2(
    @Args({ name: 'inputs', type: () => [CreateEvaluacionFase2Input] }) inputs: CreateEvaluacionFase2Input[],
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return await firstValueFrom(
      this.service.createMany(inputs, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }

  @Query(() => [EvaluacionFase2], { name: 'evaluacionesFase2' })
  async findAllEvaluacionesFase2(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ): Promise<EvaluacionFase2[]> {
    return await firstValueFrom(
      this.service.findAll(prestamoId, user)
    )
  }

  @Mutation(() => EvaluacionFase2)
  async updateEvaluacionFase2(
    @Args('input') input: UpdateEvaluacionFase2Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ): Promise<EvaluacionFase2> {
    return await firstValueFrom(
      this.service.update(input, user)
    );
  }

  @Mutation(() => BooleanResponse,  { name: 'deleteEvaluacionF2ByPrestamo' })
  async deleteByPrestamo(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ): Promise<BooleanResponse> {
    return await firstValueFrom(
      this.service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
