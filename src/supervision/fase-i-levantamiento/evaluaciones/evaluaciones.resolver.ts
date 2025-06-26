import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CreateEvaluacionFase1Input } from './dto/create-evaluacion-fase1.input';
import { UpdateEvaluacionFase1Input } from './dto/update-evaluacion-fase1.input';
import { EvaluacionFase1 } from './entities/evaluacion-fase1.entity';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { EvaluacionesService } from './evaluaciones.service';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => EvaluacionFase1)
@UseGuards(AuthGraphQLGuard)
export class EvaluacionesResolver {
  constructor(
    private readonly evaluacionesService: EvaluacionesService,
  ) {}

  @Mutation(() => EvaluacionFase1)
  async createEvaluacionFase1(
    @Args('createEvaluacionFase1Input') input: CreateEvaluacionFase1Input,
    @GetUser('graphql') user: Usuario,
  ): Promise<EvaluacionFase1> {
    return await firstValueFrom(
      this.evaluacionesService.create(input, user)
    );
  }

  @Query(() => [EvaluacionFase1], { name: 'evaluacionesFase1' })
  async findAllEvaluacionesFase1(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ): Promise<EvaluacionFase1[]> {
    return await firstValueFrom(
      this.evaluacionesService.findAll( prestamoId, user )
    );
  }

  @Mutation(() => EvaluacionFase1)
  async updateEvaluacionFase1(
    @Args('updateEvaluacionFase1Input') input: UpdateEvaluacionFase1Input,
    @GetUser('graphql') user: Usuario,
  ): Promise<EvaluacionFase1> {
    return await firstValueFrom(
      this.evaluacionesService.update( input, user )
    );
  }
}
