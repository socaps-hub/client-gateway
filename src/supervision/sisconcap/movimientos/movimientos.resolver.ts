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
import { CreateFase3Input } from './dto/inputs/create-fase3.input';
import { InventarioMovimientosResponse } from './dto/output/inventario-movimientos-response.dto';
import { SisconcapFase1StatisticsOutput } from './dto/output/fase1-stats-response.output';
import { ValidEstadosArgs } from 'src/supervision/sisconcre/solicitudes/dto/args/prestamos-by-estado.arg';
import { InventarioSolicitudesFilterInput } from 'src/supervision/sisconcre/solicitudes/dto/inputs/solicitudes/inventario-solicitudes-filter.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class MovimientosResolver {

  constructor(private readonly movimientosService: MovimientosService) {}

  @Mutation(() => BooleanResponse, { name: 'createSisconcapFase1' })
  async createFase1(
    @Args('input') input: CreateFase1Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {    
    const resp = await firstValueFrom( this.movimientosService.createFase1( input, user ) )
      
    if (resp && resp.success) {
      return {
        success: true,
        message: 'Movimiento registrado exitosamente.'
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo registrar el movimiento.',
      };
    }
  }

  @Mutation(() => BooleanResponse)
  async createOrUpdateFase2(
    @Args('input') input: CreateFase2Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const resp = await firstValueFrom(
      this.movimientosService.createOrUpdateFase2( input, user )
    )
    
    if (resp && resp.success) {
      return {
        success: true,
        message: 'Seguimiento realizado exitosamente.'
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo realizar el Seguimiento.',
      };
    }
  }

  @Mutation(() => BooleanResponse)
  async createOrUpdateFase3(
    @Args('input') input: CreateFase3Input,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const resp = await firstValueFrom(
      this.movimientosService.createOrUpdateFase3( input, user )
    )
    
    if (resp && resp.success) {
      return {
        success: true,
        message: 'Seguimiento Global realizado exitosamente.'
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo realizar el Seguimiento Global.',
      };
    }
  }

  @Query(() => [Movimiento])
  movimientos(
    @Args('filterBySucursal', { type: () => Boolean, nullable: true, defaultValue: true }) filterBySucursal: boolean,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getAll( user, filterBySucursal )
  }

  @Query(() => InventarioMovimientosResponse)
  inventarioMovimientosFiltrado(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getInventarioMovimientosFiltrado(input, user);
  }

  @Query(() => [Movimiento])
  movimientosByEstado(
    @Args() args: ValidEstadosArgs,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.findByEstado( args.estado, user, args.filterBySucursal )
  }

  @Query(() => Movimiento)
  movimiento(
    @Args('folio', ParseIntPipe) folio: number,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getByFolio( folio, user )
  }

  @Mutation(() => BooleanResponse)
  async updateMovimientoF1(
    @Args('updateMovimientoArgs') updateMovimientoArgs: UpdateMovimientoArgs,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const resp = await firstValueFrom(
      this.movimientosService.updateFase1( updateMovimientoArgs, user )
    )

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Movimiento actualizado exitosamente.'
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo actualizar el movimiento.',
      };
    }
  }

  @Mutation(() => BooleanResponse)
  async removeMovimiento(
    @Args('folio', ParseIntPipe) folio: number,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    const resp = await firstValueFrom(
      this.movimientosService.remove(folio, user)
    )
    if (resp && resp.success) {
      return { success: true, message: `Movimiento ${folio} eliminado exitosamente.` };
    } else {
      return { success: false, message: resp?.message || 'No se pudo eliminar el movimiento.', };
    }
  }

  @Mutation(() => BooleanResponse)
  async cancelFase3AndFase2(
    @Args('folio', ParseIntPipe) folio: number,
    @GetUser({type: 'graphql'}) user: Usuario,
  ): Promise<BooleanResponse> {
    const resp = await firstValueFrom(
      this.movimientosService.cancelFase3AndFase2( folio, user )
    )
      
    if (resp && resp.success) {
      return {
        success: true,
        message: 'Fase 3 cancelada exitosamente.'
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo realizar la cancelación de Fase 3.',
      };
    }
  }

  // *STATS
  @Query(() => SisconcapFase1StatisticsOutput)
  inventarioMovimientosF1Stats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getInventarioF1Stats(input, user);
  }

  @Query(() => SisconcapFase1StatisticsOutput)
  inventarioMovimientosF2Stats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getInventarioF2Stats(input, user);
  }

  @Query(() => SisconcapFase1StatisticsOutput)
  inventarioMovimientosF3Stats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({type: 'graphql'}) user: Usuario,
  ) {
    return this.movimientosService.getInventarioF3Stats(input, user);
  }

}
