import { Args, Field, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { SolicitudesService } from './solicitudes.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { SisConCreCreateFase1Input } from './dto/inputs/fase1-levantamiento/create-fase1.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { InventarioSolicitudesResponse } from './dto/output/inventario-solicitudes-response.output';
import { InventarioSolicitudesFilterInput } from './dto/inputs/solicitudes/inventario-solicitudes-filter.input';
import { Prestamo } from './entities/solicitud.entity';
import { mapR01ToPrestamo } from './mappers/prestamo.mapper';
import { UpdateAllPrestamoArgs } from './dto/args/update-all-prestamo.arg';
import { Fase1StatisticsOutput } from './dto/output/fase1-stats-response.output';
import { Fase2StatisticsOutput } from './dto/output/fase2-stats-response.output';
import { Fase3StatisticsOutput } from './dto/output/fase3-stats-response.output';
import { Fase4StatisticsOutput } from './dto/output/fase4-stats-response.output';
import { SisConCreCreateFase2Input } from './dto/inputs/fase2-seguimiento/create-fase2input';
import { SisConCreCreateFase3Input } from './dto/inputs/fase3-desembolso/create-fase3.input';
import { SisConCreCreateFase4Input } from './dto/inputs/fase4-seguimiento-global/create-or-update-fase4.input';

@Resolver()
@UseGuards(AuthGraphQLGuard)
export class SolicitudesResolver {

  constructor(private readonly _solicitudesService: SolicitudesService) { }

  // * FASES ACTIONS
  @Mutation(() => BooleanResponse, { name: 'createSisconcreFase1' })
  async createFase1(
    @Args('input') input: SisConCreCreateFase1Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    const resp = await firstValueFrom(this._solicitudesService.createFase1(input, user))

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Solicitud creada exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo crear la solicitud.',
      };
    }

  }

  @Mutation(() => BooleanResponse)
  async updateAllPrestamo(
    @Args('updateAllPrestamoArgs') updateAllPrestamoArgs: UpdateAllPrestamoArgs,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    const resp = await firstValueFrom(
      this._solicitudesService.updateAll(updateAllPrestamoArgs, user)
    )
    
    if (resp && resp.success) {
      return {
        success: true,
        message: 'Solicitud actualizada exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo actualizar la solicitud.',
      };
    }
  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase2' })
  async createOrUpdateFase2(
    @Args('input') input: SisConCreCreateFase2Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    const resp = await firstValueFrom(this._solicitudesService.createOrUpdateFase2(input, user))

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Seguimiento realizado exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo dar seguimiento.',
      };
    }
  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase3' })
  async createOrUpdateFase3(
    @Args('input') input: SisConCreCreateFase3Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    const resp = await firstValueFrom(this._solicitudesService.createOrUpdateFase3(input, user))

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Desembolso realizado exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo realizar el desembolso.',
      };
    }
  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase4' })
  async createOrUpdateFase4(
    @Args('input') input: SisConCreCreateFase4Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    const resp = await firstValueFrom(this._solicitudesService.createOrUpdateFase4(input, user))

    if (resp && resp.success) {
      return {
        success: true,
        message: 'Seguimiento Global realizado exitosamente.',
      };
    } else {
      return {
        success: false,
        message: resp?.message || 'No se pudo realizar el seguimiento global.',
      };
    }
  }

  @Mutation(() => BooleanResponse)
  async pasoMasivoAFase4(
    @GetUser({ type: 'graphql' }) user: Usuario,
  ): Promise<{ success: boolean; message: string }> {
    return await firstValueFrom(
      this._solicitudesService.pasoMasivoAFase4(user)
    );
  }

  @Query(() => InventarioSolicitudesResponse)
  inventarioSolicitudesFiltrado(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return this._solicitudesService.getInventarioSolicitudesFiltrado(input, user);
  }


  @Query(() => Prestamo)
  async prestamo(
    @Args('id') id: string,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this._solicitudesService.findById(id, user)
    )
    return mapR01ToPrestamo(prestamo);
  }

  @Mutation(() => BooleanResponse)
  async removePrestamo(
    @Args('R01NUM') id: string,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ): Promise<BooleanResponse> {
    try {
      await firstValueFrom(
        this._solicitudesService.remove(id, user)
      )

      return {
        success: true,
        message: `Solicitud ${id} eliminada exitosamente`,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'No se pudo eliminar la solicitud',
      };
    }

  }

  // *STATS
  @Query(() => Fase1StatisticsOutput)
  inventarioSolicitudesStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return this._solicitudesService.getInventarioSolicitudesStats(input, user);
  }

  @Query(() => Fase2StatisticsOutput)
  inventarioSeguimientosStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return this._solicitudesService.getInventarioSeguimientosStats(input, user);
  }

  @Query(() => Fase3StatisticsOutput)
  inventarioDesembolsosStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return this._solicitudesService.getInventarioDesembolsosStats(input, user);
  }

  @Query(() => Fase4StatisticsOutput)
  inventarioSeguimientoGlobalStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return this._solicitudesService.getInventarioSeguimientoGlobalStats(input, user);
  }

}
