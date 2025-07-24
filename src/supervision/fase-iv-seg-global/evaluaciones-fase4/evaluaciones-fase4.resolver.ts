import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EvaluacionesFase4Service } from './evaluaciones-fase4.service';
import { EvaluacionFase4 } from './entities/evaluacion-fase4.entity';
import { CreateEvaluacionFase4Input } from './dto/inputs/create-evaluacion-fase4.input';
import { UpdateEvaluacionFase4Input } from './dto/inputs/update-evaluacion-fase4.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { firstValueFrom } from 'rxjs';
import { CreateEvaluacionResumenFase4Input } from './resumen-fase4/dto/inputs/create-evaluacion-resumen-fase4.input';
import { SaveEvaluacionesFase4Args } from './dto/args/save-evaluaciones-fase4.args';

@Resolver(() => EvaluacionFase4)
@UseGuards(AuthGraphQLGuard)
export class EvaluacionesFase4Resolver {

  constructor(private readonly service: EvaluacionesFase4Service) { }

  @Mutation(() => BooleanResponse)
  async saveEvaluacionesFase4(
    @Args('saveEvaluacionesFase4Args') saveEvaluacionesFase4Args: SaveEvaluacionesFase4Args,
    @GetUser('graphql') user: Usuario,
  ): Promise<BooleanResponse> {
    return await firstValueFrom(
      this.service.saveEvaluacionesFase4(saveEvaluacionesFase4Args, user)
    )
      .then( success => success)
      .catch( (err) => err )
  }

  @Mutation(() => BooleanResponse)
  async createEvaluacionesFase4(
    @Args('inputs', { type: () => [CreateEvaluacionFase4Input] }) inputs: CreateEvaluacionFase4Input[],
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.service.createMany(inputs, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }

  @Query(() => [EvaluacionFase4], { name: 'evaluacionesFase4' })
  async evaluacionesFase4ByPrestamo(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.service.findAll(prestamoId, user)
    );
  }

  @Mutation(() => EvaluacionFase4)
  async updateEvaluacionFase4(
    @Args('input') input: UpdateEvaluacionFase4Input,
  ) {
    return await firstValueFrom(
      this.service.update(input)
    );
  }

  @Mutation(() => BooleanResponse)
  async deleteEvaluacionFase4ByPrestamo(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
