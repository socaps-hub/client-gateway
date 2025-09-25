import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovimientosService } from './movimientos.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { CreateFase1Input } from './dto/inputs/create-fase1.input';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Movimiento } from './entities/movimiento.entity';
import { UpdateMovimientoArgs } from './dto/inputs/update-movimiento.input';
import { CreateFase2Input } from './dto/inputs/create-fase2.input';
import { ValidEstadosArgs } from 'src/supervision/fase-i-levantamiento/solicitudes/dto/args/prestamos-by-estado.arg';
import { CreateFase3Input } from './dto/inputs/create-fase3.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MovimientosResolver {

  constructor(private readonly movimientosService: MovimientosService) {}

  @Mutation(() => BooleanResponse, { name: 'createSisconcapFase1' })
  async createFase1(
    @Args('input') input: CreateFase1Input,
    @GetUser('graphql') user: Usuario,
  ) {    
    try {
      await firstValueFrom( this.movimientosService.createFase1( input, user ) )

      return {
        success: true,
        message: 'Fase 1 creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'No se pudo crear la Fase 1',
      };
    }

  }

  @Mutation(() => BooleanResponse)
  async createOrUpdateFase2(
    @Args('input') input: CreateFase2Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.movimientosService.createOrUpdateFase2( input, user )
    )
      .then( success => success)
      .catch( (err) => err )
  }

  @Mutation(() => BooleanResponse)
  async createOrUpdateFase3(
    @Args('input') input: CreateFase3Input,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.movimientosService.createOrUpdateFase3( input, user )
    )
      .then( success => success)
      .catch( (err) => err )
  }

  @Query(() => [Movimiento])
  movimientos(
    @Args('filterBySucursal', { type: () => Boolean, nullable: true, defaultValue: true }) filterBySucursal: boolean,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.movimientosService.getAll( user, filterBySucursal )
  }

  @Query(() => [Movimiento])
  movimientosByEstado(
    @Args() args: ValidEstadosArgs,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.movimientosService.findByEstado( args.estado, user, args.filterBySucursal )
  }

  @Query(() => Movimiento)
  movimiento(
    @Args('folio', ParseIntPipe) folio: number,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.movimientosService.getByFolio( folio, user )
  }

  @Mutation(() => BooleanResponse)
  async updateMovimientoF1(
    @Args('updateMovimientoArgs') updateMovimientoArgs: UpdateMovimientoArgs,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.movimientosService.updateFase1( updateMovimientoArgs, user )
    )
      .then( success => success)
      .catch( (err) => err )
  }

  @Mutation(() => Movimiento)
  removeMovimiento(
    @Args('folio', ParseIntPipe) folio: number,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.movimientosService.remove(folio, user)
  }

}
