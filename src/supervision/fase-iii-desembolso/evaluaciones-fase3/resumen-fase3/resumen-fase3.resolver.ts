import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { EvaluacionResumenFase3 } from './entities/resumen-fase3.entity';
import { ResumenFase3Service } from './resumen-fase3.service';
import { CreateEvaluacionResumenFase3Input } from './dtos/inputs/create-resumen-fase3.input';
import { UpdateEvaluacionResumenFase3Input } from './dtos/inputs/update-resumen-fase3.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';

@Resolver(() => EvaluacionResumenFase3)
@UseGuards(AuthGraphQLGuard)
export class ResumenFase3Resolver {

  constructor(private readonly resumenFase3Service: ResumenFase3Service) {}

  @Mutation(() => EvaluacionResumenFase3)
  createResumenFase3(
    @Args('createEvaluacionResumenFase3Input') input: CreateEvaluacionResumenFase3Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase3Service.create(input, user);
  }

  @Query(() => [EvaluacionResumenFase3])
  resumenesFase3(
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase3Service.findAll(user);
  }

  @Query(() => EvaluacionResumenFase3)
  resumenFase3ByPrestamo(
    @Args('R10P_num', { type: () => String }) R10P_num: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase3Service.findOne(R10P_num, user);
  }

  @Mutation(() => EvaluacionResumenFase3)
  updateResumenFase3(
    @Args('updateEvaluacionResumenFase3Input') input: UpdateEvaluacionResumenFase3Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.resumenFase3Service.update(input, user);
  }

  @Mutation(() => BooleanResponse, { name: 'deleteResumenF3ByPrestamo' })
  async deleteByPrestamo(
    @Args('prestamoId', { type: () => String }) prestamoId: string,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return await firstValueFrom(
      this.resumenFase3Service.deleteByPrestamo(prestamoId, user)
    )
      .then( success => ({ success }))
      .catch( () => ({ success: false }) )
  }
}
