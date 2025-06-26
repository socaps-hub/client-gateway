import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { EvaluacionResumenFase1 } from './entities/resumen-fase1.entity';
import { CreateResumenFase1Input } from './dto/create-resumen-fase1.input';
import { UpdateResumenFase1Input } from './dto/update-resumen-fase1.input';
import { ResumenFase1Service } from './resumen.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => EvaluacionResumenFase1)
@UseGuards(AuthGraphQLGuard)
export class ResumenFase1Resolver {
  
  constructor(private readonly resumenFase1Service: ResumenFase1Service) {}

  @Mutation(() => EvaluacionResumenFase1)
  createResumenFase1(
    @Args('createResumenFase1Input') input: CreateResumenFase1Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase1Service.create(input, user);
  }

  @Query(() => [EvaluacionResumenFase1])
  resumenesFase1(
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase1Service.findAll(user);
  }

  @Query(() => EvaluacionResumenFase1)
  resumenFase1ByPrestamo(
    @Args('R06P_num', { type: () => String }) R06P_num: string,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase1Service.findOne(R06P_num, user);
  }

  @Mutation(() => EvaluacionResumenFase1)
  updateResumenFase1(
    @Args('updateResumenFase1Input') input: UpdateResumenFase1Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.resumenFase1Service.update(input, user);
  }
}
