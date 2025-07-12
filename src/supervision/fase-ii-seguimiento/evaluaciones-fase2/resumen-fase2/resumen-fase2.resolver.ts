import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ResumenFase2Service } from './resumen-fase2.service';
import { EvaluacionResumenFase2 } from './entities/evaluacion-resumen-fase2.entity';
import { CreateEvaluacionResumenFase2Input } from './dto/inputs/create-evaluacion-resumen-fase2.input';
import { UpdateEvaluacionResumenFase2Input } from './dto/inputs/update-evaluacion-resumen-fase2.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';

@Resolver(() => EvaluacionResumenFase2)
@UseGuards(AuthGraphQLGuard)
export class ResumenFase2Resolver {
  
  constructor(private readonly resumenFase2Service: ResumenFase2Service) {}

  @Mutation(() => EvaluacionResumenFase2)
  createResumenFase2(
    @Args('createEvaluacionResumenFase2Input') input: CreateEvaluacionResumenFase2Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase2Service.create(input, user)
  }

  @Query(() => [EvaluacionResumenFase2])
  resumenesFase2(
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase2Service.findAll(user);
  }

  @Query(() => EvaluacionResumenFase2)
  resumenFase2ByPrestamo(
    @Args('R08P_num', { type: () => String }) R08P_num: string,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase2Service.findOne(R08P_num, user);
  }

  @Mutation(() => EvaluacionResumenFase2)
  updateResumenFase2(
    @Args('updateEvaluacionResumenFase2Input') input: UpdateEvaluacionResumenFase2Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase2Service.update(input, user);
  }

  @Mutation(() => BooleanResponse, { name: 'deleteResumenF2ByPrestamo' })
  async deleteByPrestamo(
    @Args('prestamoId', { type: () => String }) prestamoId: string,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.resumenFase2Service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
