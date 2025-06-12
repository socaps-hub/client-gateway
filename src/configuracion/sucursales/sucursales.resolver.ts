import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { SucursalesService } from './sucursales.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Usuario } from 'src/supervision/usuarios/entities/usuario.entity';
import { Sucursal } from './entities/sucursal.entity';
import { CreateSucursaleInput } from './dto/inputs/create-sucursale.input';

@Resolver(() => Sucursal)
@UseGuards( AuthGraphQLGuard )
export class SucursalesResolver {

  constructor(private readonly sucursalesService: SucursalesService) {}

  @Mutation(() => Sucursal)
  createSucursal(
    @Args('createSucursalInput') createSucursalInput: CreateSucursaleInput,
    @GetUser('graphql') user: Usuario
  ) {
    return this.sucursalesService.create(createSucursalInput, user);
  }

  @Query(() => [Sucursal], { name: 'sucursales' })
  findAll(
    @GetUser('graphql') user: Usuario
  ) {
    return this.sucursalesService.findAll( user );
  }

  @Query(() => Sucursal, { name: 'sucursal' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @GetUser('graphql') user: Usuario
  ) {
    return this.sucursalesService.findOne(id, user);
  }

  // @Mutation(() => Sucursale)
  // updateSucursale(@Args('updateSucursaleInput') updateSucursaleInput: UpdateSucursaleInput) {
  //   return this.sucursalesService.update(updateSucursaleInput.id, updateSucursaleInput);
  // }

  // @Mutation(() => Sucursale)
  // removeSucursale(@Args('id', { type: () => Int }) id: number) {
  //   return this.sucursalesService.remove(id);
  // }
}