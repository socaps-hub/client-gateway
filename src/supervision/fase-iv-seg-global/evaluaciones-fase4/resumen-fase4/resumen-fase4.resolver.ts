import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { EvaluacionResumenFase4 } from './entities/resumen-fase4.entity';
import { CreateEvaluacionResumenFase4Input } from './dto/inputs/create-evaluacion-resumen-fase4.input';
import { UpdateEvaluacionResumenFase4Input } from './dto/inputs/update-evaluacion-resumen-fase4.input';
import { ResumenFase4Service } from './resumen-fase4.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { firstValueFrom } from 'rxjs';

@Resolver(() => EvaluacionResumenFase4)
@UseGuards(AuthGraphQLGuard)
export class ResumenFase4Resolver {

  constructor(private readonly resumenFase4Service: ResumenFase4Service) {}

  @Mutation(() => EvaluacionResumenFase4)
  createResumenFase4(
    @Args('createResumenFase4Input') input: CreateEvaluacionResumenFase4Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase4Service.create(input, user);
  }

  @Query(() => [EvaluacionResumenFase4])
  resumenesFase4(
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase4Service.findAll(user);
  }

  @Query(() => EvaluacionResumenFase4)
  resumenFase4ByPrestamo(
    @Args('prestamoId', { type: () => ID }) prestamoId: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase4Service.findOne(prestamoId, user);
  }

  @Mutation(() => EvaluacionResumenFase4)
  updateResumenFase4(
    @Args('updateResumenFase4Input') input: UpdateEvaluacionResumenFase4Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase4Service.update(input, user);
  }

  @Mutation(() => BooleanResponse, { name: 'deleteResumenF4ByPrestamo' })
  async deleteByPrestamo(
    @Args('prestamoId', { type: () => String }) prestamoId: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return await firstValueFrom(
      this.resumenFase4Service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
