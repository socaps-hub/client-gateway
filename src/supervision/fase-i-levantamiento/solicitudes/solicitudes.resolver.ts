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
    @GetUser('graphql') user: Usuario,
  ): Promise<Prestamo[]> {
    const lista = await firstValueFrom(
      this.solicitudesService.findAll(user)
    )
    return lista.map(mapR01ToPrestamo);
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
}
