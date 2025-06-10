import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LimitePrudencialService } from './limite-prudencial.service';
import { LimitePrudencial } from './entities/limite-prudencial.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateLimitePrudencialInput } from './dto/inputs/create-limite-prudencial.input';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';

@Resolver(() => LimitePrudencial)
@UseGuards( AuthGraphQLGuard )
export class LimitePrudencialResolver {
  constructor(private readonly limitePrudencialService: LimitePrudencialService) {}

  @Mutation(() => LimitePrudencial)
  createLimitePrudencial(
    @Args('createLimitePrudencialInput') createLimitePrudencialInput: CreateLimitePrudencialInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.limitePrudencialService.create(createLimitePrudencialInput, user);
  }

  @Query(() => LimitePrudencial)
  findLastLimitePrudencial(
    @GetUser('graphql') user: Usuario,
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