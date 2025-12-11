import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SolicitudesService } from './solicitudes.service';
import { CreatePrestamoInput } from './dto/create-solicitud.input';
import { UpdatePrestamoInput } from './dto/update-solicitud.input';

import { mapR01ToPrestamo } from './mappers/prestamo.mapper';
import { Prestamo } from './entities/solicitud.entity';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { UpdateAllPrestamoArgs } from './dto/args/update-all-prestamo.arg';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { ValidEstadosArgs } from './dto/args/prestamos-by-estado.arg';
import { InventarioSolicitudesResponse } from './dto/output/inventario-solicitudes-response.output';
import { InventarioSolicitudesFilterInput } from './dto/inventario-solicitudes-filter.input';
import { Fase1StatisticsOutput } from './dto/output/fase1-stats-response.output';
import { Fase2StatisticsOutput } from './dto/output/fase2-stats-response.output';
import { Fase3StatisticsOutput } from './dto/output/fase3-stats-response.output';
import { Fase4StatisticsOutput } from './dto/output/fase4-stats-response.output';

@Resolver(() => Prestamo)
@UseGuards(AuthGraphQLGuard)
export class SolicitudesResolver {

  constructor(
    private readonly solicitudesService: SolicitudesService
  ) {}

  @Mutation(() => Prestamo)
  async createPrestamo(
    @Args('createPrestamoInput') createPrestamoInput: CreatePrestamoInput,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this.solicitudesService.create(createPrestamoInput, user)
    )
    return mapR01ToPrestamo(prestamo);
  }

  @Query(() => [Prestamo])
  async prestamos(
    @Args('filterBySucursal', { type: () => Boolean, nullable: true, defaultValue: true }) filterBySucursal: boolean,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo[]> {
    const lista = await firstValueFrom(
      this.solicitudesService.findAll(user, filterBySucursal)
    )
    return lista.map(mapR01ToPrestamo);
  }
  @Query(() => InventarioSolicitudesResponse)
  inventarioSolicitudesFiltrado(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.solicitudesService.getInventarioSolicitudesFiltrado(input, user);
  }
  

  @Query(() => Prestamo)
  async prestamo(
    @Args('id') id: string,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this.solicitudesService.findById(id, user)
    )
    return mapR01ToPrestamo(prestamo);
  }

  @Query(() => [Prestamo])
  async prestamosByEstado(
    @Args() args: ValidEstadosArgs,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo[]> {
    const lista = await firstValueFrom(
      this.solicitudesService.findByEstado(args.estado, user, args.filterBySucursal)
    )
    return lista.map(mapR01ToPrestamo);
  }

  @Mutation(() => Prestamo)
  async updatePrestamo(
    @Args('updatePrestamoInput') updatePrestamoInput: UpdatePrestamoInput,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this.solicitudesService.update(updatePrestamoInput, user)
    )
    return mapR01ToPrestamo(prestamo);
  }

  @Mutation(() => BooleanResponse)
  async updateAllPrestamo(
    @Args('updateAllPrestamoArgs') updateAllPrestamoArgs: UpdateAllPrestamoArgs,
    @GetUser('graphql') user: Usuario,
  ) {
    return await firstValueFrom(
      this.solicitudesService.updateAll({ ...updateAllPrestamoArgs, user })
    )
      .then( success => success)
      .catch( (err) => err )
  }

  @Mutation(() => Prestamo)
  async removePrestamo(
    @Args('R01NUM') id: string,
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo> {
    const prestamo = await firstValueFrom(
      this.solicitudesService.remove(id, user)
    )
    return mapR01ToPrestamo(prestamo);
  }

  // *STATS
  @Query(() => Fase1StatisticsOutput)
  inventarioSolicitudesStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.solicitudesService.getInventarioSolicitudesStats(input, user);
  }

  @Query(() => Fase2StatisticsOutput)
  inventarioSeguimientosStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.solicitudesService.getInventarioSeguimientosStats(input, user);
  }

  @Query(() => Fase3StatisticsOutput)
  inventarioDesembolsosStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.solicitudesService.getInventarioDesembolsosStats(input, user);
  }

  @Query(() => Fase4StatisticsOutput)
  inventarioSeguimientoGlobalStats(
    @Args('input') input: InventarioSolicitudesFilterInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.solicitudesService.getInventarioSeguimientoGlobalStats(input, user);
  }
}
