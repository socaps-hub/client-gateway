import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreditoService } from './credito.service';
import { AuthGraphQLGuard } from 'src/auth/guards/auth-graphql.guard';
import { Usuario } from 'src/configuracion/usuarios/entities/usuario.entity';
import { ParametrosMuestraInput } from './dto/inputs/muestra-params.input';
import { ResultadoMuestraCreditoResponse } from './dto/outputs/resultado-muestra.output';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { BooleanResponse } from 'src/common/dto/boolean-response.object';
import { CreateMuestraSeleccionInput } from './dto/inputs/muestra-seleccion/create-muestra-seleccion.input';
import { ResultadoMuestrasResponse } from './dto/outputs/muestra-seleccion/resultado-muestras.output';
import { GetAllMuestrasInput } from './dto/inputs/muestra-seleccion/get-all-muestras.input';
import { ResultadoCreditosSeleccionadosResponse } from './dto/outputs/muestra-credito-seleccion/resultado-creditos-seleccionados.output';
import { GetCreditosSeleccionadosInput } from './dto/inputs/muestra-credito-seleccion/get-creditos-seleccionados.input';
import { ParametrosMuestraExtendInput } from './dto/inputs/muestra-params-extend.input';

@Resolver()
@UseGuards( AuthGraphQLGuard )
export class CreditoResolver {

  constructor(private readonly creditoService: CreditoService) {}

  // * CALCULO DE UNIVERSO Y MUESTRA
  // ────────────────────────────────────────────────
  // 🔹 1️⃣ Endpoint principal: Cálculo inicial
  // (Se ejecuta solo al presionar "Calcular y Buscar")
  // ────────────────────────────────────────────────
  @Query(() => ResultadoMuestraCreditoResponse, {
    name: 'aCreditoGetMuestraInicial',
    description: 'Calcula la muestra global, universo y resumen de sucursales (valores absolutos)',
  })
  public getMuestraInicial(
    @Args('input') input: ParametrosMuestraExtendInput,
    @GetUser('graphql') usuario: Usuario,
  ) {
    return this.creditoService.getMuestraInicial(input, usuario);
  }

  // ────────────────────────────────────────────────
  // 🔹 2️⃣ Endpoint secundario: Créditos filtrados
  // (Se ejecuta con lazy load, filtros o búsqueda)
  // ────────────────────────────────────────────────
  @Query(() => ResultadoMuestraCreditoResponse, {
    name: 'aCreditoGetCreditosFiltrados',
    description: 'Obtiene los créditos filtrados para la tabla sin recalcular valores globales',
  })
  public getCreditosFiltrados(
    @Args('input') input: ParametrosMuestraExtendInput,
    @GetUser('graphql') usuario: Usuario,
  ) {
    return this.creditoService.getCreditosFiltrados(input, usuario);
  }

  // * GUARDADO DE MUESTRA (SELECCION)
  @Mutation(() => BooleanResponse, {
    name: 'aCreditoCreateOrUpdateMuestraSeleccion',
  })
  async createOrUpdateMuestraSeleccionConFolios(
    @Args('input') input: CreateMuestraSeleccionInput,
    @Args({ name: 'folios', type: () => [Int] }) folios: number[],
    @Args({ name: 'isUpdate', type: () => Boolean, nullable: true, defaultValue: false }) isUpdate: boolean,
    @Args({ name: 'muestraId', type: () => Int, nullable: true }) muestraId: number,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.creditoService.createOrUpdateMuestraSeleccionConFolios( user, input, folios, isUpdate, muestraId );
  }

  @Query(() => ResultadoMuestrasResponse, { name: 'aCreditoGetAllMuestras' })
  async getAllMuestras(
    @Args('input', { type: () => GetAllMuestrasInput }) input: GetAllMuestrasInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.creditoService.getAllMuestrasSeleccion(user, input);
  }

  @Query(() => ResultadoCreditosSeleccionadosResponse, { name: 'aCreditoGetCreditosSeleccionadosByMuestra' })
  async getCreditosSeleccionadosByMuestra(
    @Args('input', { type: () => GetCreditosSeleccionadosInput }) input: GetCreditosSeleccionadosInput,
    @GetUser('graphql') user: Usuario,
  ) {
    return this.creditoService.getCreditosSeleccionadosByMuestra(user, input);
  }

  @Query(() => [Int], { name: 'aCreditoGetMuestraDetalleById' })
  async getMuestraDetalleById(
    @Args('muestraId', { type: () => Int }) muestraId: number,
  ) {
    return this.creditoService.getMuestraDetalleById(muestraId);
  }
  
}
