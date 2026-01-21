import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SolicitudesService } from './solicitudes.service';
import { UseGuards } from '@nestjs/common';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { SisConCreCreateFase1Input } from './dto/inputs/fase1-levantamiento/create-fase1.input';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { InventarioSolicitudesResponse } from './dto/output/inventario-solicitudes-response.output';
import { InventarioSolicitudesFilterInput } from './dto/inputs/solicitudes/inventario-solicitudes-filter.input';
import { Prestamo } from './entities/solicitud.entity';
import { mapR01ToPrestamo } from './mappers/prestamo.mapper';
import { ValidEstadosArgs } from './dto/args/prestamos-by-estado.arg';
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
    try {
      await firstValueFrom(this._solicitudesService.createFase1(input, user))

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
  async updateAllPrestamo(
    @Args('updateAllPrestamoArgs') updateAllPrestamoArgs: UpdateAllPrestamoArgs,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    return await firstValueFrom(
      this._solicitudesService.updateAll(updateAllPrestamoArgs, user)
    )
      .then(success => success)
      .catch((err) => err)
  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase2' })
  async createOrUpdateFase2(
    @Args('input') input: SisConCreCreateFase2Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    try {
      await firstValueFrom(this._solicitudesService.createOrUpdateFase2(input, user))

      return {
        success: true,
        message: 'Fase 2 creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'No se pudo crear la Fase 2',
      };
    }

  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase3' })
  async createOrUpdateFase3(
    @Args('input') input: SisConCreCreateFase3Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    try {
      await firstValueFrom(this._solicitudesService.createOrUpdateFase3(input, user))

      return {
        success: true,
        message: 'Fase 3 creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'No se pudo crear la Fase 3',
      };
    }

  }

  @Mutation(() => BooleanResponse, { name: 'createOrUpdateSisconcreFase4' })
  async createOrUpdateFase4(
    @Args('input') input: SisConCreCreateFase4Input,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ) {
    try {
      await firstValueFrom(this._solicitudesService.createOrUpdateFase4(input, user))

      return {
        success: true,
        message: 'Fase 4 creada exitosamente',
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'No se pudo crear la Fase 4',
      };
    }

  }

  @Mutation(() => BooleanResponse)
  async pasoMasivoAFase4(
    @GetUser({type: 'graphql'}) user: Usuario,
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

  @Mutation(() => Prestamo)
  async removePrestamo(
    @Args('R01NUM') id: string,
    @GetUser({ type: 'graphql' }) user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this._solicitudesService.remove(id, user)
    )
    return mapR01ToPrestamo(prestamo);
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
