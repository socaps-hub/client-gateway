import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LimitePrudencialService } from './limite-prudencial.service';
import { LimitePrudencial } from './entities/limite-prudencial.entity';
import { CreateLimitePrudencialInput } from './dto/inputs/create-limite-prudencial.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { firstValueFrom } from 'rxjs';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';

@Resolver(() => LimitePrudencial)
@UseGuards( AuthGraphQLGuard )
export class LimitePrudencialResolver {
  constructor(private readonly limitePrudencialService: LimitePrudencialService) {}

  @Mutation(() => BooleanResponse)
  async createLimitePrudencial(
    @Args('createLimitePrudencialInput') createLimitePrudencialInput: CreateLimitePrudencialInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const resp = await firstValueFrom( this.limitePrudencialService.create(createLimitePrudencialInput, user) )

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Límite prudencial creado exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo crear el límite prudencial.',
      };
    }
  }

  @Query(() => LimitePrudencial)
  findLastLimitePrudencial(
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.limitePrudencialService.findLast(user);
  }

  // @Query(() => [LimitePrudencial], { name: 'limitePrudencial' })
  // findAll() {
  //   return this.limitePrudencialService.findAll();
  // }

  // @Query(() => LimitePrudencial, { name: 'limitePrudencial' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.limitePrudencialService.findOne(id);
  // }

  // @Mutation(() => LimitePrudencial)
  // updateLimitePrudencial(@Args('updateLimitePrudencialInput') updateLimitePrudencialInput: UpdateLimitePrudencialInput) {
  //   return this.limitePrudencialService.update(updateLimitePrudencialInput.id, updateLimitePrudencialInput);
  // }

  // @Mutation(() => LimitePrudencial)
  // removeLimitePrudencial(@Args('id', { type: () => Int }) id: number) {
  //   return this.limitePrudencialService.remove(id);
  // }
}