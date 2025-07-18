import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { EvaluacionFase3 } from './entities/evaluacion-fase3.entity';
import { EvaluacionFase3Service } from './evaluaciones-fase3.service';
import { CreateEvaluacionFase3Input } from './dto/inputs/create-evaluacion-fase3.input';
import { UpdateEvaluacionFase3Input } from './dto/inputs/update-evaluacion-fase3.input';

@Resolver(() => EvaluacionFase3)
@UseGuards(AuthGraphQLGuard)
export class EvaluacionesFase3Resolver {

  constructor(private readonly service: EvaluacionFase3Service) {}

  @Mutation(() => BooleanResponse)
  async createEvaluacionesFase3(
    @Args({ name: 'inputs', type: () => [CreateEvaluacionFase3Input] }) inputs: CreateEvaluacionFase3Input[],
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.service.createMany(inputs, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }

  @Query(() => [EvaluacionFase3], { name: 'evaluacionesFase3' })
  async findAllEvaluacionesFase3(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ): Promise<EvaluacionFase3[]> {
    return await firstValueFrom(
      this.service.findAll(prestamoId, user)
    )
  }

  @Mutation(() => EvaluacionFase3)
  async updateEvaluacionFase3(
    @Args('input') input: UpdateEvaluacionFase3Input,
    @GetUser('graphql') user: Usuario,
  ): Promise<EvaluacionFase3> {
    return await firstValueFrom(
      this.service.update(input, user)
    );
  }

  @Mutation(() => BooleanResponse,  { name: 'deleteEvaluacionF3ByPrestamo' })
  async deleteByPrestamo(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ): Promise<BooleanResponse> {
    return await firstValueFrom(
      this.service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
